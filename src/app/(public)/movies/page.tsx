'use client'

import MovieRow from "../../components/MovieRow";
import { useState, useEffect, useRef } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
}

export default function Movie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [toprateds, setToprated] = useState<Movie[]>([]);
    const [upcomings, setUpcoming] = useState<Movie[]>([]);
    const [featured, setFeatured] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const [
                    resMovies,
                    resFeatured, 
                    resToprated,
                    resUpcoming
                ] = await Promise.all([
                    fetch("/api/movies"),
                    fetch("/api/movies/trending"),
                    fetch("/api/movies/top-rated"),
                    fetch("/api/movies/upcoming"),
                ]);

                const jsonMovies = await resMovies.json();
                const jsonFeatured = await resFeatured.json();
                const jsonToprated = await resToprated.json();
                const jsonUpcoming = await resUpcoming.json();

                setMovies(jsonMovies.data?.results || []);
                setToprated(jsonToprated.results || []);
                setUpcoming(jsonUpcoming.results || []);
                setFeatured(jsonFeatured.results?.[0] || null);
            } catch (error) {
                console.error('Fetch Error!', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white text-xl font-medium">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
            <header
                className="relative h-[85vh] w-full bg-cover bg-center bg-no-repeat flex items-end p-8 sm:p-16"
                style={{
                    backgroundImage: featured?.backdrop_path
                        ? `linear-gradient(to top, #141414 5%, rgba(20,20,20,0.6) 50%, rgba(20,20,20,0.3) 100%), url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`
                        : 'none'
                }}
            >
                {featured && (
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full max-w-7xl mx-auto gap-6 z-10">
                        <div className="max-w-2xl space-y-4">
                            <h1 className="text-4xl sm:text-6xl font-black tracking-wide drop-shadow-lg">
                                {featured.title}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
                                {featured.overview}
                            </p>
                        </div>
                        
                        <a href={`/movies/${featured.id}`} className="shrink-0">
                            <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-md font-bold text-base hover:bg-white/80 transition shadow-lg">
                                + More Info
                            </button>
                        </a>
                    </div>
                )}
            </header>
            <section className="relative px-6 sm:px-12 py-8">
                <MovieRow title="Discoery" movies={movies}/>
                <MovieRow title="Top Rated" movies={toprateds}/>
                <MovieRow title="Up coming" movies={upcomings}/>
            </section>
        </div>
    );
}