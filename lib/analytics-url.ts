const privateRoute = /^\/(invite|test|waiting|result|report)(?:\/.*)?$/;
const campaignParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "rb_clickid"];

export function analyticsUrl(url: URL) {
    const page = new URL(url.origin);
    const route = privateRoute.exec(url.pathname);
    page.pathname = route ? `/${route[1]}` : url.pathname;
    if (page.pathname === "/result" && url.searchParams.get("checkout") === "1") {
        page.searchParams.set("checkout", "1");
    }
    for (const key of campaignParams) {
        const value = url.searchParams.get(key);
        if (value) page.searchParams.set(key, value);
    }
    return page.href;
}

export function initialReferrer() {
    try {
        const referrer = new URL(document.referrer);
        return referrer.origin === window.location.origin ? analyticsUrl(referrer) : referrer.origin;
    } catch {
        return "";
    }
}

