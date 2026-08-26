import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const tmdbUrl = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
        : "https://api.themoviedb.org/3/discover/movie"

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

    const data = await response.json();
    return NextResponse.json({ message: 'data: ', data });
    } catch (error) {
        console.error('Error', error)
    }
}