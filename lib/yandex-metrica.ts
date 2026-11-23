const counterId = 114586778;

type Command =
    | [number, "init", { defer: boolean; sendTitle: boolean; webvisor: boolean; disableYtm: boolean }]
    | [number, "hit", string, { referer: string }]
    | [number, "reachGoal", "test_started" | "full_report_clicked"];

type Metrica = ((...command: Command) => void) & { a?: Command[]; l?: number };
let initialized = false;

function metrica() {
    const page = window as Window & { ym?: Metrica };
    if (!page.ym) {
        const queue: Command[] = [];
        page.ym = Object.assign((...command: Command) => {
            queue.push(command);
        }, { a: queue, l: Date.now() });
    }

    if (!initialized) {
        page.ym(counterId, "init", {
            defer: true,
            sendTitle: false,
            webvisor: false,
            disableYtm: true,
        });
        initialized = true;
    }
    return page.ym;
}

export function trackMetricaView(url: string, referer: string) {
    metrica()(counterId, "hit", url, { referer });
}

export function trackMetricaGoal(goal: "test_started" | "full_report_clicked") {
    metrica()(counterId, "reachGoal", goal);
}
