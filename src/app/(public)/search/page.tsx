'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/src/app/components/Card';

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
                const response = await fetch(`/api/multi/search?query=${encodeURIComponent(query)}`);
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
        <main className="min-h-screen bg-[#141414] p-6 sm:p-12 text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-100">
                    {query ? `Results for: "${query}"` : 'Write for search'}
                </h1>

                {movies.length === 0 ? (
                    <p className="text-gray-400">Not found movie.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                        {movies.map((movie) => (
                            <div key={movie.id} className="w-full max-w-[200px]">
                                <Card
                                    id={movie.id}
                                    title={movie.title}
                                    urlImage={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
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