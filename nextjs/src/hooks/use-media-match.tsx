'use client';

import { useEffect, useState } from "react";

export const useMediaMatch = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const match = (string: string) => { setMatches(window.matchMedia(string).matches) };
        match(query);
        window.addEventListener("resize", () => match(query));
        return () => window.removeEventListener("resize", () => match(query));
    }, []);

    return matches;
};