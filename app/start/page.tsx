"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Start() {
    const [a,setA]=useState(""); const [b,setB]=useState("");
    const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const router=useRouter();
    async function go() {
        if (busy) return;
        if (!a.trim() || !b.trim()) { setError("Введите оба имени"); return; }
        setBusy(true); setError("");
        try {
            const response=await fetch("/api/couples",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({a,b})});
            const result=await response.json();
            if (!response.ok || !result.id) throw new Error(result.error || "Не удалось создать пару");
            router.push(`/test/${result.id}`);
        } catch (err) { setError(err instanceof Error ? err.message : "Не удалось создать пару. Попробуйте ещё раз"); }
        finally { setBusy(false); }
    }
    return <main className="shell"><header className="site-header"><div className="brand">между нами</div></header><section className="hero"><div className="eyebrow">знакомство</div><h1 className="h1" style={{fontSize:52}}>Кто проходит этот тест?</h1><label htmlFor="name-a">Как тебя зовут?</label><input id="name-a" className="input" value={a} maxLength={80} onChange={e=>setA(e.target.value)} placeholder="Например, Иван"/><label htmlFor="name-b">А партнёра?</label><input id="name-b" className="input" value={b} maxLength={80} onChange={e=>setB(e.target.value)} placeholder="Например, Алина"/>{error && <p role="alert">{error}</p>}<button className="btn" onClick={go} disabled={busy}>{busy?"Создаём пару…":"Продолжить"}</button></section></main>;
}
