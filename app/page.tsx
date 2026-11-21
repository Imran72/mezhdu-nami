import Link from "next/link";
import { StoryArt, StoryHeader } from "./story";

export default function Home() {
    return (
        <main className="story story-home">
            <StoryHeader />
            <h1 className="story-title story-home-title">Любите друг друга.<br />А понимаете?</h1>
            <p className="story-lead">Ответьте отдельно и сравните ваши взгляды на отношения</p>
            <StoryArt scene="home" />
            <Link href="/start" className="story-button">Пройти тест вдвоём <span aria-hidden="true">→</span></Link>
            <p className="story-note">Бесплатно · Каждый отвечает отдельно</p>
            <section className="story-callout story-callout-lilac">
                <h2>Знакомая ситуация?</h2>
                <p>Один хочет поговорить, другому нужно немного тишины. Сравните ответы и узнайте, чего каждый ждёт в такие моменты.</p>
            </section>
        </main>
    );
}
