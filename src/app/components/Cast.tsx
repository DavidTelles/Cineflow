'use client'

import { useState } from "react";

interface CastMember {
    id: number;
    name: string;
    profile_path?: string;
}

interface CastProps {
    cast: CastMember[];
}

export default function Cast({ cast }: CastProps) {
    const [showCast, setShowCast] = useState(false);

    return (
        <div className="mt-8">

            <button
                onClick={() => setShowCast(!showCast)}
                className="flex items-center justify-center bg-[#6d6d6e]/70 text-white px-8 py-3.5 rounded-md font-bold text-base hover:bg-[#6d6d6e]/50 transition backdrop-blur-md"
            >
                {showCast ? "Hide Cast" : "View Cast"}
            </button>

            {showCast && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 transition">

                    {cast.map((actor) => {

                        const actorImageUrl = actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : 'https://via.placeholder.com/185x185?text=No+Image';

                        return (
                            <div
                                key={actor.id}
                                className="bg-zinc-900/50 p-3 rounded-lg border border-white/5 flex flex-col items-center text-center gap-3"
                            >
                                <img
                                    src={actorImageUrl}
                                    alt={actor.name}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-zinc-700/50"
                                />

                                <p className="font-semibold text-sm md:text-base line-clamp-2">
                                    {actor.name}
                                </p>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}