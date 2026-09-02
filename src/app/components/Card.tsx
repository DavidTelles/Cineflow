'use client'

interface MovieProps {
    id: number;
    title?: string;
    name?: string;
    urlImage: string;
    media_type?: string;
}

export default function Card({ id, title, name, urlImage, media_type = 'movie' }: MovieProps) {
    const displayTitle = title || name || '';
    const type = media_type === 'tv' ? 'serie' : media_type;

    if (media_type === 'person') return null;

    return (
        <a href={`/home/${type}/${id}`} className="block">
            <div className="relative w-32 h-48 xs:w-36 xs:h-54 sm:w-40 sm:h-60 md:w-44 md:h-64 lg:w-48 lg:h-72 overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
                <img
                    src={urlImage}
                    alt={displayTitle}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-white">
                        {displayTitle}
                    </p>
                </div>
            </div>
        </a>
    );
}