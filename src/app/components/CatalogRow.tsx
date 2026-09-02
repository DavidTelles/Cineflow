'use client'

import { useRef } from "react";
import Card from "./Card";

interface Catalog {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type?: string;
}

interface CatalogRowProps {
    title: string;
    catalogs: Catalog[];
}

export default function CatalogRow({ title, catalogs }: CatalogRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const rightArrow = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );

    const leftArrow = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );

    const rollLeft = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const rollRight = () => {
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4">
                {title}
            </h2>

            <div className="group relative">
                <button
                    onClick={rollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/70 hover:bg-black text-white rounded-full transition shadow-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                    {leftArrow}
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 sm:pb-4 scrollbar-none scroll-smooth"
                >
                    {catalogs.map((catalog) => (
                        <div
                            key={catalog.id}
                            className="flex-none snap-start transition-transform hover:scale-105 duration-300"
                        >
                            <Card
                                id={catalog.id}
                                title={catalog.title}
                                name={catalog.name}
                                urlImage={`https://image.tmdb.org/t/p/w500${catalog.poster_path}`}
                                media_type={catalog.media_type}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={rollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/70 hover:bg-black text-white rounded-full transition shadow-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                >
                    {rightArrow}
                </button>
            </div>
        </div>
    );
}