'use client';

import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from "react";
import { translations, SupportedLanguage } from "./traslations";

export type { SupportedLanguage };

export type TranslationKey = keyof typeof translations["en-US"];
export type TranslationsType = Record<TranslationKey, string>;

interface LanguageContextType {
    language: SupportedLanguage;
    setLanguage: (language: SupportedLanguage) => void;
    t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<SupportedLanguage>("en-US");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("app_language") as SupportedLanguage;
        if (savedLanguage && translations[savedLanguage]) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = useCallback((newLanguage: SupportedLanguage) => {
        setLanguageState(newLanguage);
        localStorage.setItem("app_language", newLanguage);
    }, []);

    const t: TranslationsType = useMemo(() => {
        return translations[language] || translations["en-US"];
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t,
    }), [language, setLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }

    return context;
}