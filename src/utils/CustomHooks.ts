import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeHandler/ThemeContext";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export const useTheme = () => useContext(ThemeContext);
