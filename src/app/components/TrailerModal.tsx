'use client';

import { useState } from 'react';

interface TrailerModalProps {
    trailerKey: string;
}

export default function TrailerModal({ trailerKey }: TrailerModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-md font-bold text-base hover:bg-white/80 transition shadow-lg"
            >
                ▶ Play
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

                    <div
                        className="absolute inset-0"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 z-20 text-white bg-black/60 hover:bg-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition"
                        >
                            ✕
                        </button>

                        <div className="aspect-video w-full">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                title="Trailer do Filme"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}