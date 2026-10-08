import { NextResponse } from "next/server";
import { confirmPayment } from "../../../../lib/payment";
export async function POST(req: Request) {
    let body;
    try { body = await req.json(); } catch { return NextResponse.json({error: "Invalid JSON"}, {status: 400}); }
    if (body?.event !== "payment.succeeded") return NextResponse.json({ok: true});
    try { await confirmPayment(body?.object?.id); return NextResponse.json({ok: true}); }
    catch { return NextResponse.json({error: "Payment confirmation failed"}, {status: 503}); }
}
