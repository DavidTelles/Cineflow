import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated",
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