import { validId } from "../../../lib/participant-auth";
import { confirmPayment } from "../../../lib/payment";
import {NextRequest,NextResponse} from 'next/server';import { admin } from '../../../lib/supabase';import { score } from '../../../lib/scoring';import OpenAI from 'openai';
export async function GET(req: NextRequest) {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    if (!validId(id)) return NextResponse.json({error: "invalid_id"}, {status: 400});
    try {
        const db = admin();
        const [{data: couple, error: coupleError}, {data: answers, error: answersError}] = await Promise.all([
            db.from("couples").select("id,partner_a_name,partner_b_name,partner_a_completed,partner_b_completed,paid").eq("id", id).single(),
            db.from("answers").select("*").eq("couple_id", id),
        ]);
        if (coupleError || !couple) return NextResponse.json({error: "couple_not_found"}, {status: 404});
        if (answersError) return NextResponse.json({error: "answers_unavailable"}, {status: 503});
        if (!couple.partner_a_completed || !couple.partner_b_completed) return NextResponse.json({waiting: true, couple});
        if (params.get("full") === "1" && !couple.paid) {
            const paymentId = req.cookies.get(`payment_${id}`)?.value;
            if (paymentId && await confirmPayment(paymentId, id)) couple.paid = true;
            if (!couple.paid) return NextResponse.json({error: paymentId ? "payment_pending" : "payment_required"}, {status: 402});
        }
        return NextResponse.json({couple, ...score(answers || [])});
    } catch {
        return NextResponse.json({error: "report_unavailable"}, {status: 503});
    }
}
export async function POST(req:Request){const {coupleId}=await req.json();const db=admin();const {data:existing}=await db.from('reports').select('*').eq('couple_id',coupleId).maybeSingle();const [{data:couple},{data:answers}]=await Promise.all([db.from('couples').select('*').eq('id',coupleId).single(),db.from('answers').select('*').eq('couple_id',coupleId)]);if(!couple?.paid)return NextResponse.json({error:'payment_required'},{status:402});if(existing)return NextResponse.json(existing);const base=score(answers||[]);if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:'OPENAI_API_KEY is missing'},{status:503});const ai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});const completion=await ai.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-5-mini',response_format:{type:'json_object'},messages:[{role:'system',content:'Ты создаёшь нейтральный разбор ответов пары. Не ставь диагнозы, не решай кто прав, не говори совместимы ли они и не рекомендуй расставание. Используй только данные. Верни JSON с ключами summary, strengths (array), differences (array), understanding (string), discuss (array из 5 вопросов), experiment (string). Пиши конкретно и бережно.'},{role:'user',content:JSON.stringify({names:[couple.partner_a_name,couple.partner_b_name],...base})}]});const report=JSON.parse(completion.choices[0].message.content||'{}');const {data}=await db.from('reports').insert({couple_id:coupleId,report_json:report}).select().single();return NextResponse.json(data)}
