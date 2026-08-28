'use client'

import { useState } from "react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const EyeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );

    const EyeOff = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );

    const inputStyle = "w-full p-2 border-b-2 outline-none bg-transparent transition-colors duration-200 border-slate-300 focus:border-indigo-600 text-black placeholder-slate-400 dark:border-white/50 dark:focus:border-white dark:text-white dark:placeholder-white/70";

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-7xl min-h-160 bg-white/42 dark:bg-black/10 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 flex overflow-hidden transition-colors duration-300">

                <div className=" flex items-center justify-center relative w-1/2 overflow-hidden">
                    <img
                        src="/img-register-login.png"
                        alt=""
                        className="bg-[10px] object-cover object-center"
                    />
                </div>

                <form className="flex flex-col w-1/2 gap-5 p-10 text-center justify-center text-black dark:text-white">
                    <h1 className="text-3xl font-bold mb-6 tracking-wide">
                        Register
                    </h1>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className={inputStyle}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className={inputStyle}
                        required
                    />

                    <div className="relative flex items-center w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className={`${inputStyle} pr-10`}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 p-1 text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
                            aria-label="Alternar visibilidade da senha"
                        >
                            {showPassword ? EyeIcon : EyeOff}
                        </button>
                    </div>

                    <div className="relative flex items-center w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password"
                            className={`${inputStyle} pr-10`}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 p-1 text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white transition-colors cursor-pointer"
                            aria-label="Alternar visibilidade do confirmar senha"
                        >
                            {showConfirmPassword ? EyeIcon : EyeOff}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 font-sans font-bold py-2.5 px-4 rounded-lg shadow transition-all cursor-pointer active:scale-[0.98] bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-white dark:text-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
}