import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }
    const tmdbUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(
            tmdbUrl,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                    accept: "application/json"
                }
            }
        );
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro retornado pelo TMDB:', errorText);
            return NextResponse.json({ error: 'Failed to fetch TMDB data', details: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ message: 'data: ', data });
        
    } catch (error) {
        console.error('Error no Servidor Interno:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
