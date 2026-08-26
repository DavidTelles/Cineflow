'use client'

import { useState, useEffect } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
}

export default async function MoviePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const [movies, setMovies] = useState<Movie[]>([]);
    const [featured, setFeatured] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [resMovies, resFeatured] = await Promise.all([
                    fetch("/api/movies"),
                    fetch("/api/movies/trending"),
                ]);

                const jsonMovies = await resMovies.json();
                const jsonFeatured = await resFeatured.json();

                setMovies(jsonMovies.data?.results || []);
                setFeatured(jsonFeatured.results?.[0] || null);
            } catch (error) {
                console.error('Fetch Error!', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const star = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
        </svg>

    )

    return (
        <>
            <h1>
                {featured?.title}
            </h1>
            <div>
                {star} {featured?.vote_average.toFixed(1)}
                •
                {featured?.release_date.slice(0, 4)}
            </div>
            <div className="flex gap-3">
                <button className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-200 transition">
                    Assistir
                </button>

                <button className="bg-gray-500/70 text-black px-6 py-3 rounded-md font-bold hover:bg-gray-200 transition">
                    Minha lista
                </button>
            </div>
        </>
    )
}