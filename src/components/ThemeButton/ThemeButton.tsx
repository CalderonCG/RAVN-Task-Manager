import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useTheme } from "../../utils/CustomHooks";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme(); //Toggle function from Theme Context

  //Click handler: Toggles theme and closes sidebar
  const handleCLick = () => {
    toggleTheme();
  };

  //Component---------------------------------------------------
  return (
    // Icon changes based on theme
    <button onClick={() => handleCLick()}>
      {theme === "light" ? (
        <RiMoonLine className="text-2xl shrink-0 hover:text-font hover:scale-105" />
      ) : (
        <RiSunLine className="text-2xl shrink-0 hover:text-font hover:scale-105" />
      )}
    </button>
  );
}

export default ThemeButton;
