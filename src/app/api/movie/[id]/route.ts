import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            }
        }
    )

    const data = await response.json();
    return NextResponse.json(data);
}