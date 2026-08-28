import type { Metadata } from "next";
import "../globals.css";
import Topbar from "../components/Topbar";

export const metadata: Metadata = {
    title: "Cineflow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-zinc-800">
                <Topbar />
                {children}
            </body>
        </html>
    );
}