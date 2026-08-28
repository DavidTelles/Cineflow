import type { Metadata } from "next";
import "../globals.css";
import TopbarPrivate from "../components/TopbarPrivate";

export const metadata: Metadata = {
    title: "Cineflow",
    description: "Seu catálogo de filmes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-zinc-800">
                <TopbarPrivate />
                {children}
            </body>
        </html>
    );
}