import { NextRequest, NextResponse } from "next/server";
import { sessionAdClick } from "../../../lib/ad-attribution";
import { admin } from "../../../lib/supabase";
import { grantParticipant, hasParticipant, validId } from "../../../lib/participant-auth";
import crypto from "crypto";
import { getQuizVersion, quizInvitePattern, shortQuizInvitePrefix } from "../../../lib/questions";
const coupleFields = "id,created_at,partner_a_name,partner_b_name,invite_token,partner_a_completed,partner_b_completed,paid";

export async function POST(req: NextRequest) {
    try {
        const { a, b } = await req.json();
        if (typeof a !== "string" || typeof b !== "string" || !a.trim() || !b.trim() || a.trim().length > 80 || b.trim().length > 80)
            return NextResponse.json({ error: "Введите два имени, не длиннее 80 символов" }, { status: 400 });
        const { data, error } = await admin().from("couples").insert({
            partner_a_name: a.trim(),
            partner_b_name: b.trim(),
            invite_token: shortQuizInvitePrefix + crypto.randomBytes(18).toString("hex"),
            click_id: sessionAdClick(req),
        }).select(coupleFields).single();
        if (error || !data) return NextResponse.json({ error: "Не удалось создать пару" }, { status: 500 });
        const res = NextResponse.json({ ...data, quizVersion: getQuizVersion(data.invite_token) });
        grantParticipant(res, data.id, "a");
        return res;
    } catch { return NextResponse.json({ error: "Не удалось создать пару. Попробуйте ещё раз" }, { status: 500 }); }
}
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    const token = req.nextUrl.searchParams.get("token");
    if (id ? !validId(id) : !token || !quizInvitePattern.test(token)) return NextResponse.json({ error: "Некорректная ссылка" }, { status: 400 });
    const db = admin();
    const { data, error } = await db.from("couples").select(coupleFields).eq(id ? "id" : "invite_token", id || token!).single();
    if (error || !data) return NextResponse.json({ error: "Пара не найдена" }, { status: 404 });
    const { invite_token, ...publicData } = data;
    const visibleData = id && hasParticipant(req, data.id, "a") ? data : publicData;
    const res = NextResponse.json({ ...visibleData, quizVersion: getQuizVersion(invite_token) });
    if (!id) grantParticipant(res, data.id, "b");
    return res;
}
