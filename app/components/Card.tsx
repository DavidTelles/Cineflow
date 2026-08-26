'use client'

interface MovieProps {
    title: string,
    urlImage: string,
}

export default function Card({urlImage, title}:MovieProps) {
    return (
        <>
            <div className="group relative w-40 h-70 m-3 overflow-hidden rounded-xl shadow-lg transition-transform duration-500 hover:scale-105">

                <img src={urlImage} alt="" className="h-full w-full object-cover"/>

                <div className="absolute flex items-end bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 inset-0 transition-opacity duration-600 group-hover:cursor-pointer">

                    <p className="p-4 text-sm leading-relaxed text-white">{title}</p>

                </div>
            </div>
        </>
    )
}