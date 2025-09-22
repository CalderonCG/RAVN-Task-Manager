import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeHandler/ThemeContext";

//Hook to check size of the screen
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

//Hook to set the theme
export const useTheme = () => useContext(ThemeContext);

//Hook to notify if dropdown is open
export function useDropdown(
  open: boolean,
  setIsOpen: (value: React.SetStateAction<boolean>) => void,
) {
  useEffect(() => {
    setIsOpen(open);
  }, [open, setIsOpen]);
}
