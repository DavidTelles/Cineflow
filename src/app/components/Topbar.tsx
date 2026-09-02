'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function Topbar() {
    const [menu, setMenu] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])

    const moon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
    )

    const sun = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    )

    const menuHamburguer = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    )

    const closeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    )

    const searchIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    )

    return (
        <>
            {!menu && (
                <button
                    onClick={() => setMenu(true)}
                    aria-label="Open menu"
                    className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                    {menuHamburguer}
                </button>
            )}
            {menu && (
                <div
                    onClick={() => setMenu(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
                />
            )}
            {menu && (
                <aside className="fixed top-0 left-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white backdrop-blur-md z-50 p-5 flex flex-col justify-between shadow-2xl border-r border-gray-200 dark:border-gray-800 transition-all">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-sans text-2xl font-bold">
                                <Link href="/" onClick={() => setMenu(false)}>
                                    Cine<span className="text-red-800">flow</span>
                                </Link>
                            </h1>

                            <button
                                onClick={() => setMenu(false)}
                                aria-label="Exit Menu"
                                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                {closeIcon}
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 w-full pt-2 border-t border-gray-200 dark:border-gray-800">
                            <Link href="/home" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Home
                            </Link>
                            <Link href="/favorites" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Favorites
                            </Link>
                            <Link href="/watchlist" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Watchlist
                            </Link>
                            <Link href="/profile" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Profile
                            </Link>
                            <Link href="/login" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Login
                            </Link>
                            <Link href="/register" className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium text-sm" onClick={() => setMenu(false)}>
                                Register
                            </Link>
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                        <button
                            type="button"
                            onClick={() => setIsDark(!isDark)}
                            className="flex items-center justify-between w-full p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-sm font-medium">Theme</span>
                            {isDark ? sun : moon}
                        </button>
                    </div>
                </aside>
            )}
            {!menu && (
                <form
                    onSubmit={handleSearchSubmit}
                    className="fixed top-4 right-4 z-40 flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 shadow-md px-3 py-1.5 transition-all"
                >
                    <input
                        type="text"
                        name="query"
                        id="query"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 w-36 sm:w-48 pr-2"
                    />
                    <button
                        type="submit"
                        aria-label="Buscar"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                        {searchIcon}
                    </button>
                </form>
            )}
        </>
    )
}