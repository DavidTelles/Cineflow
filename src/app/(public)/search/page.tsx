'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/src/app/components/Card';

interface MediaItem {
    id: number;
    media_type: string;
    title?: string;
    name?: string;
    poster_path: string;
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSearchResults() {
            if (!query) {
                setMediaItems([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/multi/search?query=${encodeURIComponent(query)}`);
                const json = await response.json();
                setMediaItems(json.data?.results || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">
                        Loading catalog...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className="min-h-screen bg-[#141414] p-6 sm:p-12 text-white">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-100">
                        {query ? `Results for: "${query}"` : 'Write for search'}
                    </h1>

                    {mediaItems.length === 0 ? (
                        <p className="text-gray-400">Not found items.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                            {mediaItems
                                .filter((item) => item.media_type !== 'person')
                                .map((item) => (
                                    <div key={item.id} className="w-full max-w-[200px]">
                                        <Card
                                            id={item.id}
                                            title={item.title}
                                            name={item.name}
                                            media_type={item.media_type}
                                            urlImage={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'}
                                        />
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </main>
        </Suspense>
    );
}
