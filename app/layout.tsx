import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import TopMailCounter from "./top-mail-counter";
import YandexMetrica from "./yandex-metrica";
import { TOP_MAIL_COUNTER_ID } from "./top-mail-config";

export const metadata: Metadata = {
    title: {
        default: "между нами.",
        template: "%s · между нами.",
    },

    applicationName: "между нами.",

    description:
        "Узнайте, насколько одинаково вы видите ваши отношения",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body>
            {children}
            <Suspense fallback={null}>
                <TopMailCounter />
                <YandexMetrica />
            </Suspense>
            <noscript>
                <img
                    src={`https://top-fwz1.mail.ru/counter?id=${TOP_MAIL_COUNTER_ID};js=na`}
                    width={1}
                    height={1}
                    style={{ position: "absolute", left: -9999 }}
                    referrerPolicy="no-referrer"
                    alt=""
                />
            </noscript>
        </body>
        </html>
    );
}
