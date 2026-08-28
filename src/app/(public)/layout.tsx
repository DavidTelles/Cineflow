import type { Metadata } from "next";
import "../globals.css";
import TopbarPublic from "../components/TopbarPublic";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: "Cineflow",
    description: "Seu catálogo de filmes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body
                className="
            min-h-screen
            bg-slate-950
            text-white
            bg-[url('/bg-white.png')]
            dark:bg-[url('/bg-cineflow.png')]
            bg-cover
            bg-center
            bg-fixed
            bg-no-repeat
        "
            >
                <TopbarPublic />
                {children}
                <Footer />
            </body>
        </html>
    );
}