import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const artwork = {
    home: [429, 312],
    names: [353, 188],
    question: [366, 169],
    waiting: [420, 194],
    invite: [420, 316],
    result: [424, 193],
    checkout: [422, 214],
    report: [422, 196],
    retry: [396, 254],
    pending: [410, 268],
} as const;

const headings = {
    home: [379, 183, "Любите друг друга. А понимаете?"],
    names: [354, 130, "Начнём с вас двоих"],
    waiting: [344, 120, "Твоя часть готова!"],
    result: [379, 91, "Два взгляда на ваши отношения"],
    checkout: [368, 86, "Больше понимания — меньше догадок"],
    report: [343, 57, "Ваш разбор"],
    retry: [375, 155, "Не получилось сохранить ответы"],
    pending: [297, 103, "Проверяем оплату"],
} as const;

export function StoryHeading({ scene }: { scene: keyof typeof headings }) {
    const [width, height, text] = headings[scene];
    return (
        <h1 className={`story-lettering story-lettering-${scene}`}>
            <span className="visually-hidden">{text}</span>
            <Image alt="" src={`/images/${scene}-heading.svg`} width={width} height={height} unoptimized />
        </h1>
    );
}

export function StoryArt({ scene, inset = false }: { scene: keyof typeof artwork; inset?: boolean }) {
    const [width, height] = artwork[scene];
    return (
        <Image
            alt=""
            className={`story-art story-art-${scene}${inset ? " story-art-inset" : ""}`}
            src={`/images/${scene}-story.webp`}
            width={width}
            height={height}
            unoptimized
        />
    );
}

export function StoryHeader({ back, coral = false }: { back?: string | (() => void); coral?: boolean }) {
    return (
        <header className="story-header">
            {typeof back === "string" && <Link className="story-back" href={back} aria-label="Назад">←</Link>}
            {typeof back === "function" && <button className="story-back" type="button" onClick={back} aria-label="Назад">←</button>}
            <Link className={`story-brand${coral ? " story-brand-coral" : ""}`} href="/" aria-label="между нами.">
                <Image alt="" src={coral ? "/images/brand-coral.svg" : "/images/brand-lilac.svg"}
                    width={coral ? 174 : 217} height={coral ? 55 : 56} unoptimized />
            </Link>
        </header>
    );
}

export function StoryState({ children, action }: { children: ReactNode; action?: ReactNode }) {
    return (
        <main className="story">
            <StoryHeader />
            <div className="story-state">
                <p role="status">{children}</p>
                {action}
            </div>
        </main>
    );
}

export function StoryCard({ icon, title, children, lilac = false }: {
    icon: string;
    title: string;
    children: ReactNode;
    lilac?: boolean;
}) {
    return (
        <article className={`story-card${lilac ? " story-card-lilac" : ""}`}>
            <span className="story-card-icon" aria-hidden="true">{icon}</span>
            <div>
                <h2>{title}</h2>
                <div>{children}</div>
            </div>
        </article>
    );
}
