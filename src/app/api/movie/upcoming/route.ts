import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("lang") || "en-US";
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=${language}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
        }
    );

    const data = await response.json();

    return NextResponse.json(data);
}