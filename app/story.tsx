import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const artwork = {
    home: [425, 299],
    names: [325, 181],
    question: [361, 161],
    waiting: [424, 199],
    invite: [409, 314],
    result: [408, 180],
    checkout: [407, 214],
    report: [409, 200],
} as const;

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

export function StoryHeader({ back }: { back?: string | (() => void) }) {
    return (
        <header className="story-header">
            {typeof back === "string" && <Link className="story-back" href={back} aria-label="Назад">←</Link>}
            {typeof back === "function" && <button className="story-back" type="button" onClick={back} aria-label="Назад">←</button>}
            <Link className="story-brand" href="/">между нами.</Link>
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
