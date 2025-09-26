import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router";
import { avatarGenerator } from "../../utils/AvatarGenerator";
import ThemeButton from "../ThemeButton/ThemeButton";
import NotificationDropdown from "./NotificationDropdown";

//Types----------------------------------------
type SearchProps = {
  value: string;
  avatar: string | undefined;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ value, onChange, avatar }: SearchProps) {
  return (
    <div className="relative flex  w-full h-12 text-font-secondary gap-4 items-center">
      <RiSearchLine className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="grow w-32 bg-background-secondary pl-16 pr-6 lg:pr-24 rounded-2xl h-full"
        placeholder="Search"
      />
      <div className="flex gap-4 h-full items-center w-fit lg:absolute right-6 ">
        <ThemeButton />
        <NotificationDropdown />
        <Link to={"/profile"} className="shrink-0">
          <img
            src={avatarGenerator(avatar)}
            alt="avatar"
            className="w-8 h-8 rounded-full hover:scale-110"
          />
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
