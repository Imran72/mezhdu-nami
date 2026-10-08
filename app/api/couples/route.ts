import { NextRequest, NextResponse } from "next/server";
import { admin } from "../../../lib/supabase";
import { grantParticipant, hasParticipant, validId } from "../../../lib/participant-auth";
import crypto from "crypto";
export async function POST(req: NextRequest) {
    try {
        const { a, b } = await req.json();
        if (typeof a !== "string" || typeof b !== "string" || !a.trim() || !b.trim() || a.trim().length > 80 || b.trim().length > 80)
            return NextResponse.json({ error: "Введите два имени, не длиннее 80 символов" }, { status: 400 });
        const { data, error } = await admin().from("couples").insert({ partner_a_name: a.trim(), partner_b_name: b.trim(), invite_token: crypto.randomBytes(18).toString("hex") }).select().single();
        if (error || !data) return NextResponse.json({ error: "Не удалось создать пару" }, { status: 500 });
        const res = NextResponse.json(data);
        grantParticipant(res, data.id, "a");
        return res;
    } catch { return NextResponse.json({ error: "Не удалось создать пару. Попробуйте ещё раз" }, { status: 500 }); }
}
export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");
    const token = req.nextUrl.searchParams.get("token");
    if (id ? !validId(id) : !token || !/^[a-f0-9]{36}$/.test(token)) return NextResponse.json({ error: "Некорректная ссылка" }, { status: 400 });
    const db = admin();
    const { data, error } = await db.from("couples").select("*").eq(id ? "id" : "invite_token", id || token!).single();
    if (error || !data) return NextResponse.json({ error: "Пара не найдена" }, { status: 404 });
    const { invite_token, ...publicData } = data;
    const res = NextResponse.json(id && hasParticipant(req, data.id, "a") ? data : publicData);
    if (!id) grantParticipant(res, data.id, "b");
    return res;
}
