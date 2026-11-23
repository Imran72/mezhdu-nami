import { NextResponse } from "next/server";
import { validId } from "../../../lib/participant-auth";
import { admin } from "../../../lib/supabase";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const coupleId = body?.coupleId;
    if (!validId(coupleId)) return new NextResponse(null, { status: 400 });

    try {
        const db = admin();
        const { data: couple, error: lookupError } = await db
            .from("couples")
            .select("id")
            .eq("id", coupleId)
            .eq("partner_a_completed", true)
            .eq("partner_b_completed", true)
            .maybeSingle();

        if (lookupError) return new NextResponse(null, { status: 503 });
        if (!couple) return new NextResponse(null, { status: 404 });

        const { error } = await db
            .from("full_report_clicks")
            .insert({ couple_id: couple.id });

        if (error) {
            console.error("Could not record full report click", error.code);
            return new NextResponse(null, { status: 503 });
        }

        return new NextResponse(null, { status: 204 });
    } catch {
        return new NextResponse(null, { status: 503 });
    }
}
