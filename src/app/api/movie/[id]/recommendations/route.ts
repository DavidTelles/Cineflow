import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?page=1`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Fail to fecth recommendations' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data.results);
    } catch (error) {
        return NextResponse.json(
            { error: 'Fail to fecth data' },
            { status: 500 }
        );
    }
}