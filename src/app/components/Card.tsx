'use client'

interface MovieProps {
    id: number,
    title: string,
    urlImage: string,
}

export default function Card({id, urlImage, title}: MovieProps) {
    return (
        <a href={`/movies/${id}`}>
            <div className="relative w-45 h-80 m-3 overflow-hidden rounded-xl shadow-lg">
                <img src={urlImage} alt={title} className="h-full w-full object-cover" />
                <div className="absolute flex items-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 hover:opacity-100 inset-0 transition-opacity duration-300 hover:cursor-pointer">
                    <p className="p-4 text-sm leading-relaxed text-white">{title}</p>
                </div>
            </div>
        </a>
    )
}