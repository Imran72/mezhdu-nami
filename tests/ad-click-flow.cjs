const assert = require("node:assert/strict");
const { createHmac } = require("node:crypto");
const { readFileSync } = require("node:fs");
const { stripTypeScriptTypes } = require("node:module");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");
const { NextRequest } = require("next/server");

const secret = "local-test-secret";
const env = { AD_CLICK_SECRET: secret, NODE_ENV: "production", SUPABASE_SERVICE_ROLE_KEY: "service-secret" };
const errors = [];
const writes = [];
let clickWrite;

function load(path, mocks = {}) {
    let code = stripTypeScriptTypes(readFileSync(join(__dirname, "..", path), "utf8"));
    const names = [...code.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+(\w+)/g)].map(match => match[1]);
    code = code.replace(/import\s*\{([^}]+)\}\s*from\s*"([^"]+)";/g, (_, bindings, module) =>
        `const {${bindings}} = require("${module}");`);
    code = code.replace(/import (\w+) from "([^"]+)";/g, (_, binding, module) =>
        `const ${binding} = require("${module}");`);
    code = code.replace(/export\s+/g, "") + `\nObject.assign(exports, {${names.join(",")}});`;
    const exports = {};
    runInNewContext(code, {
        exports, require: module => mocks[module] ?? require(module), Buffer, URL, AbortController,
        setTimeout, clearTimeout, process: { env }, console: { error: (...args) => errors.push(args) },
    });
    return exports;
}

const coupleId = "aafb64c3-7892-4b63-bb3a-6978e0110733";
const data = { id: coupleId, invite_token: "abc" };
let lastSignal;
const db = {
    from(table) {
        return {
            upsert(row) {
                writes.push({ table, row });
                return { error: null };
            },
            insert(row) {
                writes.push({ table, row });
                return {
                    abortSignal(signal) { lastSignal = signal; return this; },
                    retry(enabled) { assert.equal(enabled, false); return clickWrite(); },
                    select(fields) {
                        assert.doesNotMatch(fields, /click_id/);
                        return { single: async () => ({ data }) };
                    },
                };
            },
            select() { return this; },
            eq() { return this; },
            async maybeSingle() { return { data: { id: coupleId } }; },
        };
    },
    rpc(table, row) {
        writes.push({ table, row });
        return { error: null };
    },
};
const supabase = { admin: () => db };
const participant = load("lib/participant-auth.ts");
const attribution = load("lib/ad-attribution.ts", { "./participant-auth": participant });
const { proxy } = load("proxy.ts", { "./lib/ad-attribution": attribution, "./lib/supabase": supabase });
const apiMocks = {
    "../../../lib/ad-attribution": attribution,
    "../../../lib/participant-auth": participant,
    "../../../lib/supabase": supabase,
};
const home = load("app/api/home-event/route.ts", apiMocks);
const report = load("app/api/full-report-click/route.ts", apiMocks);
const couples = load("app/api/couples/route.ts", {
    ...apiMocks,
    "../../../lib/questions": load("lib/questions.ts"),
});

function visit(query, options = {}) {
    const req = new NextRequest("https://example.com/" + query, options);
    const pending = [];
    const response = proxy(req, { waitUntil: promise => pending.push(promise) });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
    assert.equal(response.headers.get("x-middleware-next"), "1");
    return { response, pending };
}

function post(route, body, cookie) {
    return route.POST(new NextRequest("https://example.com/api", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
        body: JSON.stringify(body),
    }));
}

async function main() {
    clickWrite = async () => ({ error: null });
    for (const query of ["", "?utm_source=%20", "?rb_clickid=vk1"]) {
        const { response, pending } = visit(query);
        assert.equal(pending.length, 0);
        assert.equal(response.headers.get("set-cookie"), null);
        assert.equal(response.headers.get("cache-control"), null);
    }
    assert.equal(visit("?utm_source=vk", { method: "HEAD" }).pending.length, 0);

    const query = "?utm_source=vk&utm_medium=cpc&utm_campaign=%D1%82%D0%B5%D1%81%D1%82&utm_content=a%26b&utm_term=test&rb_clickid=vk1&next=https://example.org&click_id=forged";
    const headers = { "X-Real-IP": "203.0.113.42", "User-Agent": "Mozilla/5.0 test", Referer: "https://vk.com/" };
    const { response, pending } = visit(query, { headers });
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    await Promise.all(pending);

    const { row: click } = writes.at(-1);
    const clickId = click.click_id;
    assert.match(clickId, /^[0-9a-f-]{36}$/);
    assert.deepEqual(
        [click.utm_source, click.utm_medium, click.utm_campaign, click.utm_content, click.utm_term],
        ["vk", "cpc", "тест", "a&b", "test"],
    );
    assert.equal(click.referer, "https://vk.com/");
    assert.equal(click.user_agent, "Mozilla/5.0 test");
    assert.ok(Number.isFinite(Date.parse(click.created_at)));
    assert.equal(click.ip_hash, createHmac("sha256", secret).update("ad-click-ip:203.0.113.42").digest("hex"));
    assert.equal(click.is_suspicious, false);

    const setCookie = response.headers.get("set-cookie");
    assert.match(setCookie, /httponly/i);
    assert.match(setCookie, /secure/i);
    assert.match(setCookie, /samesite=lax/i);
    assert.doesNotMatch(setCookie, /max-age|expires/i);
    const cookie = setCookie.split(";")[0];

    const repeat = visit(query, { headers: { ...headers, Cookie: cookie } });
    await Promise.all(repeat.pending);
    assert.notEqual(writes.at(-1).row.click_id, clickId);
    assert.notEqual(repeat.response.headers.get("set-cookie"), setCookie);

    const visitorId = "d17ee266-53f4-4655-a612-b789c6082efe";
    for (const event of ["home_opened", "test_started"]) {
        assert.equal((await post(home, { event, visitorId }, cookie)).status, 204);
        assert.equal(writes.at(-1).table, "record_attributed_home_event");
        assert.equal(writes.at(-1).row.p_click_id, clickId);
    }
    for (const invalidCookie of [undefined, cookie + "0"]) {
        assert.equal((await post(home, { event: "home_opened", visitorId, click_id: clickId }, invalidCookie)).status, 204);
        assert.equal(writes.at(-1).table, "home_funnel_events");
        assert.equal("click_id" in writes.at(-1).row, false);
    }

    const pair = await post(couples, { a: "Анна", b: "Иван" }, cookie);
    assert.equal(pair.status, 200);
    assert.equal(writes.at(-1).row.click_id, clickId);
    assert.equal("click_id" in await pair.json(), false);
    assert.equal((await post(report, { coupleId }, cookie)).status, 204);
    assert.equal(writes.at(-1).row.click_id, clickId);

    for (const signals of [{ "Sec-Purpose": "prefetch" }, { RSC: "1" }, { "User-Agent": "VKShare" }]) {
        const preview = visit("?utm_source=vk", { headers: { Cookie: cookie, ...signals } });
        assert.equal(preview.response.headers.get("set-cookie"), null);
        await Promise.all(preview.pending);
        assert.equal(writes.at(-1).row.is_preview, true);
        assert.equal(writes.at(-1).row.is_suspicious, true);
    }

    clickWrite = async () => ({ error: { code: "fixture" } });
    await Promise.all(visit("?utm_source=vk").pending);
    assert.equal(errors.length, 1);

    clickWrite = () => new Promise(() => {});
    const hang = visit("?utm_source=vk", { headers: { "User-Agent": "curl/8.0", "X-Real-IP": "invalid" } });
    assert.ok(hang.response.headers.get("set-cookie"));
    assert.equal(lastSignal.aborted, false);
    await Promise.all(hang.pending);
    assert.equal(lastSignal.aborted, true);
    assert.equal(errors.length, 2);
    assert.equal(writes.at(-1).row.is_preview, false);
    assert.equal(writes.at(-1).row.is_suspicious, true);
    assert.equal(writes.at(-1).row.ip_hash, null);
    console.log("PASS: direct homepage request, signed session, funnel events, previews, repeat visits and non-blocking failures");
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
