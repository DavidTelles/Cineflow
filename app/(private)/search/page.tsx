'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/app/components/Card';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSearchResults() {
            if (!query) {
                setMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
                const json = await response.json();
                setMovies(json.data?.results || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return <div className="p-8 text-center text-white">Loading...</div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {query ? `Results for: "${query}"` : 'Write for search'}
            </h1>

            {movies.length === 0 ? (
                <p className="text-gray-500">Not found movie.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <Card
                            key={movie.id}
                            title={movie.title}
                            urlImage={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : ''
                            }
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}