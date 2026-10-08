import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export type ParticipantRole = "a" | "b";
export const validId = (id: unknown): id is string => typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
function signature(id: string, role: ParticipantRole) {
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!secret) throw new Error("Server authentication is not configured");
    return createHmac("sha256", secret).update(`participant:${id}:${role}`).digest("hex");
}
export function hasParticipant(req: NextRequest, id: string, role: ParticipantRole) {
    const value = req.cookies.get(`participant_${id}_${role}`)?.value;
    if (!value || !/^[a-f0-9]{64}$/.test(value)) return false;
    return timingSafeEqual(Buffer.from(value, "hex"), Buffer.from(signature(id, role), "hex"));
}
export function grantParticipant(res: NextResponse, id: string, role: ParticipantRole) {
    res.cookies.set(`participant_${id}_${role}`, signature(id, role), {
        httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
        path: "/", maxAge: 60 * 60 * 24 * 90,
    });
}
