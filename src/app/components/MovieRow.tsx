'use client'

import { useRef } from "react";
import Card from "./Card";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
}

interface MovieRowProps {
    title: string;
    movies: Movie[]
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const rightArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    );

    const leftArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    );

    const rollLeft = () => {
        if (rowRef.current) rowRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    };

    const rollRight = () => {
        if (rowRef.current) rowRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    };

    return (
        <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">{title}</h2>
            <div className="group relative">
                <button
                    onClick={rollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/70 hover:bg-black text-white rounded-full transition shadow-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                    {leftArrow}
                </button>
                <div
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none scroll-smooth"
                    ref={rowRef}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="flex-none w-36 sm:w-48 snap-start transition transform hover:scale-105 duration-300">
                            <Card
                                id={movie.id}
                                title={movie.title}
                                urlImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={rollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/70 hover:bg-black text-white rounded-full transition shadow-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                    {rightArrow}
                </button>
            </div>
        </div>
    );
}