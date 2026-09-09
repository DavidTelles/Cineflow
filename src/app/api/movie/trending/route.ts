import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const language = request.nextUrl.searchParams.get("lang") || "en-US";
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=${language}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
            cache: "no-store",
        }
    );

    const data = await response.json();

    return NextResponse.json(data);
}