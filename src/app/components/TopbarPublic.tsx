'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

export default function TopbarPublic() {
    const [isDark, setIsDark] = useState(true)

    // Aplica/remove a classe 'dark' na tag <html> do site
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

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between p-5 bg-white/42 text-gray-900 dark:bg-gray-900/70 dark:text-white backdrop-blur-md shadow-xl transition-colors duration-300 z-50">
            <h1 className="font-sans text-3xl font-bold"><a href="/home">Cine<span className="text-red-800">flow</span></a></h1>

            <nav className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => setIsDark(!isDark)}
                    className="p-1 hover:opacity-80 transition-opacity cursor-pointer"
                    aria-label="Alternar tema"
                >
                    {isDark ? sun : moon}
                </button>

                <Link href="/home" className="p-2">
                    Home
                </Link>
                <Link href="/login" className="p-2">
                    Login
                </Link>
                <Link href="/register" className="p-2">
                    Register
                </Link>
            </nav>
        </header>
    )
}