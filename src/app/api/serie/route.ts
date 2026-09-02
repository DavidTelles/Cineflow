import { NextResponse } from "next/server";

export async function GET() {
    const tmdbUrl = "https://api.themoviedb.org/3/discover/tv";

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
                { error: "Falha ao buscar séries do TMDB" },
                { status: response.status }
            );
        }

        const data = await response.json();

        const formattedResults = data.results?.map((item: any) => ({
            ...item,
            title: item.title || item.name,
            media_type: 'serie',
        }));

        return NextResponse.json({ ...data, results: formattedResults });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}