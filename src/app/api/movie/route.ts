import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("lang") || "en-US";

    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?language=${language}`;

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
                { error: "Failed to fetch movies from TMDB" },
                { status: response.status }
            );
        }

        const data = await response.json();

        const formattedResults = data.results?.map((item: any) => ({
            ...item,
            title: item.title || item.name,
            media_type: 'movie'
        }));

        return NextResponse.json({ ...data, results: formattedResults });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}