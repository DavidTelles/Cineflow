import { GetById } from "@/src/services/get";
import { GetRecommendations } from "@/src/services/get-recommendations";
import { GetCredits } from "@/src/services/get-credits";
import { GetTrailer } from "@/src/services/get-trailer";
import Cast from "@/src/app/components/Cast";
import TrailerModal from "@/src/app/components/TrailerModal";
import Card from "@/src/app/components/Card";

interface Genre {
    id: number;
    name: string;
}

interface Serie {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date: string;
    genres?: Genre[];
}

export default async function SeriePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [serie, cast, trailerKey, recommendations] = await Promise.all([
        GetById(id, 'tv') as Promise<Serie>,
        GetCredits(id, 'tv'),
        GetTrailer(id, 'tv'),
        GetRecommendations(id, 'tv'),
    ]);

    const backdropUrl = serie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
        : "";

    const star = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 text-yellow-400"
        >
            <path
                fillRule="evenodd"
                d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                clipRule="evenodd"
            />
        </svg>
    );

    return (
        <div className="min-h-screen bg-[#141414] text-white relative">
            <div className="absolute inset-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
                {backdropUrl && ( <img src={backdropUrl} alt={serie.name} className="w-full h-full object-cover object-center opacity-60" /> )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 min-h-screen pb-16 pt-32 flex flex-col justify-end gap-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-wide drop-shadow-lg">
                    {serie.name}
                </h1>

                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 font-medium">
                    <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-white/10">
                        {star}
                        <span className="text-white font-bold">
                            {serie.vote_average?.toFixed(1)}
                        </span>
                    </div>

                    <span>{serie.release_date?.slice(0, 4)}</span>

                    {serie.genres && serie.genres.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {serie.genres.map((genre) => (
                                    <span key={genre.id} className="text-gray-400">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4 mt-2">
                    {trailerKey ? (
                        <TrailerModal trailerKey={trailerKey} />
                    ) : (
                        <button disabled className="bg-white/50 text-black px-8 py-3.5 rounded-md font-bold cursor-not-allowed">
                            ▶ Don't have Trailer
                        </button>
                    )}
                </div>

                <div className="max-w-2xl mt-4">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed drop-shadow">
                        {serie.overview || "No overview available for this movie."}
                    </p>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col gap-12 border-t border-white/10">
                {cast.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold tracking-wide">Cast</h2>
                        <Cast cast={cast.slice(0, 10)} />
                    </div>
                )}

                {recommendations.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold tracking-wide">Recommendation</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-30">
                            {recommendations.map((recommendation) => (
                                <Card key={recommendation.id} id={recommendation.id} title={recommendation.name} urlImage={
                                        recommendation.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}`
                                            : ''
                                    }
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}