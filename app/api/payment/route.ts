import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { admin } from "../../../lib/supabase";
import { validId } from "../../../lib/participant-auth";
import { PLAN_PRICE, paymentAuth } from "../../../lib/payment";
export async function POST(req: Request) {
    let body;
    try { body = await req.json(); } catch { return NextResponse.json({error: "Некорректный запрос"}, {status: 400}); }
    const coupleId = body?.coupleId;
    if (!validId(coupleId)) return NextResponse.json({error: "Некорректная ссылка"}, {status: 400});
    try {
        const {data: couple, error} = await admin().from("couples").select("paid,partner_a_completed,partner_b_completed").eq("id", coupleId).single();
        if (error || !couple) return NextResponse.json({error: "Пара не найдена"}, {status: 404});
        if (!couple.partner_a_completed || !couple.partner_b_completed) return NextResponse.json({error: "Сначала завершите оба теста"}, {status: 409});
        const reportUrl = `/report/${coupleId}`;
        if (couple.paid) return NextResponse.json({confirmation_url: reportUrl});
        if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) return NextResponse.json({error: "Оплата пока недоступна"}, {status: 503});
        const origin = process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
            : new URL(req.url).origin;
        const response = await fetch("https://api.yookassa.ru/v3/payments", {method: "POST", headers: {Authorization: paymentAuth(), "Idempotence-Key": randomUUID(), "Content-Type": "application/json"}, body: JSON.stringify({amount: {value: PLAN_PRICE, currency: "RUB"}, capture: true, confirmation: {type: "redirect", return_url: new URL(reportUrl, origin).href}, description: "План для пары на 3 месяца — между нами", metadata: {coupleId}})});
        const payment = await response.json();
        if (!response.ok || !validId(payment.id) || !payment.confirmation?.confirmation_url) return NextResponse.json({error: "Не удалось открыть оплату. Попробуйте ещё раз"}, {status: 502});
        const result = NextResponse.json({confirmation_url: payment.confirmation.confirmation_url});
        result.cookies.set(`payment_${coupleId}`, payment.id, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 86400});
        return result;
    } catch { return NextResponse.json({error: "Не удалось открыть оплату. Попробуйте ещё раз"}, {status: 502}); }
}
