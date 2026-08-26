'use client'

import Card from "@/app/components/Card";
import React, { useState, useEffect, useRef } from "react";

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
    const [featured, setFeatured] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const rigthArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>;

    const leftArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>;

    const rollRigth = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const rollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <>
            <header
                className="relative h-[80vh] h-screen w-full bg-cover bg-center bg-no-repeat flex items-end p-8 sm:p-12 transition-all duration-300"
                style={{
                    backgroundImage: featured?.backdrop_path
                        ? `linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`
                        : 'none'
                }}
            >
                {featured && (
                    <div className="max-w-2xl text-white space-y-3 z-10">
                        <h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-md">
                            {featured.title}
                        </h1>
                        <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed">
                            {featured.overview}
                        </p>
                    </div>
                )}
            </header>

            {/* Slider de Filmes */}
            <section className="relative p-6">
                <h2 className="dark:text-white p-3 text-2xl font-bold">Discovery</h2>
                <button onClick={rollLeft} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-2 shadow-md rounded-full dark:text-white bg-black/50">{leftArrow}</button>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none" ref={scrollRef}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-none w-40 sm:w-48 snap-start">
                            <Card
                                title={movie.title}
                                urlImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={rollRigth} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 shadow-md rounded-full dark:text-white bg-black/50">{rigthArrow}</button>
            </section>
        </>
    );
}