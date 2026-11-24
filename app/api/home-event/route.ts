import { NextRequest, NextResponse } from "next/server";
import { sessionAdClick } from "../../../lib/ad-attribution";
import { validId } from "../../../lib/participant-auth";
import { admin } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null);
    const visitorId = body?.visitorId;
    const event = body?.event;
    if (!validId(visitorId) || (event !== "home_opened" && event !== "test_started")) {
        return new NextResponse(null, { status: 400 });
    }

    try {
        const clickId = sessionAdClick(request);
        const db = admin();
        const { error } = clickId
            ? await db.rpc("record_attributed_home_event", {
                p_visitor_id: visitorId, p_event: event, p_click_id: clickId,
            })
            : await db.from("home_funnel_events").upsert(
                { visitor_id: visitorId, event },
                { onConflict: "day_moscow,visitor_id,event", ignoreDuplicates: true },
            );
        if (error) {
            console.error("Could not record home funnel event", error.code);
            return new NextResponse(null, { status: 503 });
        }
        return new NextResponse(null, { status: 204 });
    } catch {
        return new NextResponse(null, { status: 503 });
    }
}
