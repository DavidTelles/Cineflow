import type { Metadata } from "next";
import "../globals.css";
import Topbar from "../components/Topbar";
import { LanguageProvider } from "@/src/contexts/LanguageContext";

export const metadata: Metadata = {
    title: "Cineflow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="scrollbar-none">
            <body className="bg-white dark:bg-zinc-800">
                <LanguageProvider >
                    <Topbar />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}