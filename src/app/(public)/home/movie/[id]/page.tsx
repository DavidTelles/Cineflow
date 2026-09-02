import GetMovieById from "@/src/services/get-movie"

interface CastMember {
    id: number;
    name: string;
    profile_path?: string;
}

interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
    genres?: Genre[];
    credits?: {
        cast: CastMember[];
    };
}

export default async function MoviePage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params;
    const movie: Movie = await GetMovieById(id);

    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` 
        : '';

    const star = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-yellow-400">
            <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#141414] text-white relative">
            <div className="absolute inset-0 h-[80vh] w-full overflow-hidden z-0">
                {backdropUrl && (
                    <img 
                        src={backdropUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover object-center opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 flex flex-col gap-6">
                
                <h1 className="text-4xl md:text-6xl font-black tracking-wide drop-shadow-lg">
                    {movie.title}
                </h1>

                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 font-medium">
                    <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/10">
                        {star} 
                        <span className="text-white font-bold">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <span>{movie.release_date?.slice(0, 4)}</span>
                    {movie.genres && movie.genres.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="text-gray-400">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-md font-bold text-base hover:bg-white/80 transition shadow-lg">
                        ▶ Play
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-[#6d6d6e]/70 text-white px-8 py-3.5 rounded-md font-bold text-base hover:bg-[#6d6d6e]/50 transition backdrop-blur-md">
                        + My List
                    </button>
                </div>
                <div className="max-w-2xl mt-4">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed drop-shadow">
                        {movie.overview || "No overview available for this movie."}
                    </p>
                </div>

                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-gray-200 mb-4">Cast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {movie.credits.cast.slice(0, 6).map((actor) => (
                                <div key={actor.id} className="flex flex-col items-center text-center bg-black/30 p-2 rounded-lg border border-white/5">
                                    {actor.profile_path ? (
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                                            alt={actor.name}
                                            className="w-20 h-20 object-cover rounded-full mb-2 shadow-md"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-700 rounded-full mb-2 flex items-center justify-center text-xs text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <span className="text-sm font-semibold text-white truncate w-full">{actor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}