'use client'

import CatalogRow from "../../components/CatalogRow";
import { useState, useEffect } from "react";

interface Catalog {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date?: string;
    media_type?: string;
}

type FilterType = 'all' | 'movies' | 'series';

export default function Home() {

    const [filter, setFilter] = useState<FilterType>('all');

    const [trending, setTrending] = useState<Catalog[]>([]);
    const [discoveryMovies, setDiscoveryMovies] = useState<Catalog[]>([]);
    const [discoverySeries, setDiscoverySeries] = useState<Catalog[]>([]);
    const [toprateds, setToprated] = useState<Catalog[]>([]);
    const [upcomings, setUpcoming] = useState<Catalog[]>([]);
    const [featured, setFeatured] = useState<Catalog | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const endpoints = [
                    "/api/multi?window=day",
                    "/api/movie",
                    "/api/serie",
                    "/api/movie/trending",
                    "/api/movie/top-rated",
                    "/api/movie/upcoming"
                ];

                const responses = await Promise.all(
                    endpoints.map((endpoint) => fetch(endpoint))
                );

                const data = await Promise.all(
                    responses.map((res) => (
                        res.ok ? res.json() : { results: [] }
                    ))
                );

                const [
                    jsonTrending,
                    jsonDiscoveryMovies,
                    jsonDiscoverySeries,
                    jsonFeatured,
                    jsonToprated,
                    jsonUpcoming
                ] = data;

                setTrending(jsonTrending.results || []);
                setDiscoveryMovies(jsonDiscoveryMovies.results || []);
                setDiscoverySeries(jsonDiscoverySeries.results || []);
                setFeatured(jsonFeatured.results?.[0] || null);
                setToprated(jsonToprated.results || []);
                setUpcoming(jsonUpcoming.results || []);

            } catch (error) {
                console.error('Fetch Error!', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const seriesTrending = trending.filter(
        (item) => item.media_type === 'serie' || item.media_type === 'tv'
    );

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

    const featuredType = featured?.media_type === 'tv'
        ? 'serie'
        : (featured?.media_type || 'movie');

    return (
        <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
            <header
                className="relative h-[65vh] sm:h-[80vh] w-full bg-cover bg-center bg-no-repeat flex items-end px-5 sm:px-12 lg:px-20 pb-10 sm:pb-16"
                style={{
                    backgroundImage: featured?.backdrop_path
                        ? `linear-gradient(
                            to top,
                            #141414 5%,
                            rgba(20,20,20,0.65) 50%,
                            rgba(20,20,20,0.25) 100%
                        ),
                        url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`
                        : 'none'
                }}
            >
                {featured && (
                    <div className="w-full max-w-7xl mx-auto z-10">
                        <div className="max-w-2xl space-y-4 sm:space-y-5">
                            <span className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-widest">
                                Featured
                            </span>

                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                                {featured.title}
                            </h1>

                            <p className="text-xs sm:text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed">
                                {featured.overview}
                            </p>

                            <div className="flex gap-3 pt-1 sm:pt-2">
                                <a href={`/home/${featuredType}/${featured.id}`} className="bg-white text-black px-5 sm:px-7 py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-bold hover:bg-gray-200 transition" >
                                    + More Info
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <nav className="sticky top-0 z-30 bg-[#141414]/95 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-12">
                    <div className="flex items-center gap-4 sm:gap-8 h-14 sm:h-16">

                        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
                            <button onClick={() => setFilter('all')}
                                className={`
                                    shrink-0 px-4 sm:px-5 py-1.5 sm:py-2
                                    rounded-full text-xs sm:text-sm font-semibold
                                    transition-all duration-200
                                    ${filter === 'all' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10' }
                                `} >
                                All
                            </button>

                            <button onClick={() => setFilter('movies')}
                                className={`
                                    shrink-0 px-4 sm:px-5 py-1.5 sm:py-2
                                    rounded-full text-xs sm:text-sm font-semibold
                                    transition-all duration-200
                                    ${filter === 'movies'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `} >
                                Movies
                            </button>

                            <button onClick={() => setFilter('series')}
                                className={`
                                    shrink-0 px-4 sm:px-5 py-1.5 sm:py-2
                                    rounded-full text-xs sm:text-sm font-semibold
                                    transition-all duration-200
                                    ${filter === 'series'
                                        ? 'bg-white text-black'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `} >
                                Series
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-full mx-auto px-3 sm:px-6 md:px-12 py-7 sm:py-10">

                {filter === 'all' && (
                    <div className="space-y-10 sm:space-y-14">
                        <CatalogRow title="Discovery Movies" catalogs={discoveryMovies} />
                        <CatalogRow title="Discovery Series" catalogs={discoverySeries} />
                        <CatalogRow title="Recommendations" catalogs={trending} />
                        <CatalogRow title="Top Rated" catalogs={toprateds} />
                        <CatalogRow title="Up coming" catalogs={upcomings} />
                    </div>
                )}

                {filter === 'movies' && (
                    <div className="space-y-10 sm:space-y-14">
                        <CatalogRow title="Discovery Movies" catalogs={discoveryMovies} />
                        <CatalogRow title="Top Rated" catalogs={toprateds} />
                        <CatalogRow title="Up coming" catalogs={upcomings} />
                    </div>
                )}

                {filter === 'series' && (
                    <div className="space-y-10 sm:space-y-14">
                        <CatalogRow title="Discovery Series" catalogs={discoverySeries} />
                        <CatalogRow title="Recommendations" catalogs={seriesTrending} />
                    </div>
                )}

            </main>
        </div>
    );
}