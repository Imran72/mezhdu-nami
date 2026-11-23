import StartTestLink from "./start-test-link";
import { StoryArt, StoryHeader, StoryHeading } from "./story";

export default function Home() {
    return (
        <main className="story story-home">
            <StoryHeader />
            <StoryHeading scene="home" />
            <StoryArt scene="home" alt="Оба смотрят в телефоны. Она думает: «Он злится?». Он думает: «Отвечу потом»." />
            <p className="story-lead">Ответьте отдельно и сравните ваши взгляды на отношения</p>
            <StartTestLink />
            <p className="story-note">Бесплатно · Каждый отвечает отдельно</p>
        </main>
    );
}
