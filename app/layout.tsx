import "./globals.css";
import type { Metadata } from "next";

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
        </body>
        </html>
    );
}