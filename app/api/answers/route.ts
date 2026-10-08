import { NextRequest, NextResponse } from "next/server";
import { admin } from "../../../lib/supabase";
import { hasParticipant, validId } from "../../../lib/participant-auth";
import { questions } from "../../../lib/questions";
export async function POST(req: NextRequest) {
    let body;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Некорректные данные" }, { status: 400 }); }
    const { coupleId, role, answers } = body || {};
    if (!validId(coupleId) || (role !== "a" && role !== "b")) return NextResponse.json({ error: "Некорректный участник" }, { status: 400 });
    if (!hasParticipant(req, coupleId, role)) return NextResponse.json({ error: "Нет доступа к ответам этого участника" }, { status: 403 });
    if (!answers || typeof answers !== "object" || Array.isArray(answers) || Object.keys(answers).length !== questions.length || questions.some(q => !q.options.some(o => o.value === answers[q.id])))
        return NextResponse.json({ error: "Ответьте на все вопросы, выбрав доступные варианты" }, { status: 400 });
    const db = admin();
    const { data: couple, error: loadError } = await db.from("couples").select("partner_a_completed,partner_b_completed").eq("id", coupleId).single();
    if (loadError || !couple) return NextResponse.json({ error: "Пара не найдена" }, { status: 404 });
    const completed = role === "a" ? "partner_a_completed" : "partner_b_completed";
    if (couple[completed]) return NextResponse.json({ error: "Тест уже завершён" }, { status: 409 });
    // Insert rather than upsert: concurrent/repeated submissions cannot overwrite answers.
    const rows = questions.map(q => ({ couple_id: coupleId, role, question_id: q.id, answer_value: answers[q.id] }));
    const { error } = await db.from("answers").insert(rows);
    if (error && error.code !== "23505") return NextResponse.json({ error: "Не удалось сохранить ответы" }, { status: 500 });
    if (error) {
        const { data: existing } = await db.from("answers").select("question_id,answer_value").eq("couple_id", coupleId).eq("role", role);
        if (!existing || existing.length !== questions.length || existing.some(a => answers[a.question_id] !== a.answer_value))
            return NextResponse.json({ error: "Ответы уже сохранены и не могут быть заменены" }, { status: 409 });
    }
    const { error: updateError } = await db.from("couples").update({ [completed]: true }).eq("id", coupleId);
    if (updateError) return NextResponse.json({ error: "Не удалось завершить тест. Повторите отправку" }, { status: 500 });
    return NextResponse.json({ ok: true });
}
