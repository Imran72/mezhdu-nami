import { admin } from "./supabase";
import { validId } from "./participant-auth";
import { PLAN_PRICE } from "./plan-price";
export { PLAN_PRICE } from "./plan-price";
export function paymentAuth() {
    if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) throw new Error("Payment is not configured");
    return `Basic ${Buffer.from(`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_SECRET_KEY}`).toString("base64")}`;
}
export async function confirmPayment(paymentId: string, expectedCouple?: string) {
    if (!validId(paymentId)) return false;
    const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {headers: {Authorization: paymentAuth()}, cache: "no-store"});
    if (!response.ok) throw new Error("Payment verification failed");
    const payment = await response.json();
    const coupleId = payment.metadata?.coupleId;
    if (payment.id !== paymentId || !validId(coupleId) || (expectedCouple && coupleId !== expectedCouple) || payment.status !== "succeeded" || payment.paid !== true || payment.amount?.value !== PLAN_PRICE || payment.amount?.currency !== "RUB") return false;
    const db = admin();
    const {error: recordError} = await db.from("payments").upsert({payment_id: payment.id, couple_id: coupleId, amount: payment.amount.value, status: payment.status}, {onConflict: "payment_id"});
    if (recordError) throw new Error("Payment recording failed");
    const {error} = await db.from("couples").update({paid: true}).eq("id", coupleId);
    if (error) throw new Error("Payment activation failed");
    return true;
}
