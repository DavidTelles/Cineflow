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
        <a href={`/home/${type}/${id}`}>
            <div className="relative w-45 h-80 m-3 overflow-hidden rounded-xl shadow-lg">
                <img
                    src={urlImage}
                    alt={displayTitle}
                    className="h-full w-full object-cover"
                />

                <div className="absolute flex items-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 inset-0 transition-opacity duration-300 hover:cursor-pointer">
                    <p className="p-4 text-sm leading-relaxed text-white">
                        {displayTitle}
                    </p>
                </div>
            </div>
        </a>
    );
}