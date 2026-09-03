interface CastMember {
    id: number;
    name: string;
    profile_path?: string;
}

interface CastProps {
    cast: CastMember[];
}

export default function Cast({ cast }: CastProps) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                {cast.map((actor) => {
                    const actorImageUrl = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : 'https://via.placeholder.com/185x185?text=No+Image';

                    return (
                        <div
                            key={actor.id}
                            className="group bg-zinc-900/50 hover:bg-zinc-800/80 p-4 rounded-xl border border-white/5 hover:border-white/20 flex flex-col items-center text-center gap-3 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
                        >
                            <div className="overflow-hidden rounded-full border-2 border-zinc-700/50 group-hover:border-white/40 transition-colors duration-300">
                                <img
                                    src={actorImageUrl}
                                    alt={actor.name}
                                    className="w-24 h-24 md:w-28 md:h-28 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <p className="font-semibold text-sm md:text-base text-gray-200 group-hover:text-white line-clamp-2 transition-colors duration-300">
                                {actor.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}