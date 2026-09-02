import { NextResponse } from "next/server";

export async function GET() {

    const tmdbUrl = `https://api.themoviedb.org/3/trending/all/day`;

    try {
        const response = await fetch(tmdbUrl, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Falha ao buscar dados do TMDB" },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}