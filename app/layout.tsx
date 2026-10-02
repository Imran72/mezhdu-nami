import "./globals.css";

export const metadata = {
    title: "между нами.",
    description:
        "Узнайте, насколько одинаково вы видите ваши отношения",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <body>
        {children}
        </body>
        </html>
    );
}