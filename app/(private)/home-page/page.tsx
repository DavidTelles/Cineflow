'use client'

import Card from "@/app/components/Card";
import React, { useState, useEffect, useRef } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export default function HomePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies');
                const json = await response.json();

                setMovies(json.data?.results || []);
            } catch (error) {
                console.error('Fetch Error!', error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    const rigthArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>

    const leftArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>

    const rollRigth = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    const rollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }


    return (
        <>
            <header className="bg-black h-screen"></header>

            <section className="relative p-6">
                <h1 className="dark:text-white p-3 text-2xl">Discovery</h1>
                <button onClick={rollLeft} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-2 shadow-md rounded-full dark:text-white">{leftArrow}</button>
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
                <button onClick={rollRigth} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 shadow-md rounded-full dark:text-white">{rigthArrow}</button>
            </section>
        </>
    );
}