import { RiNotification3Line, RiSearchLine } from "react-icons/ri";
import { Link } from "react-router";

type SearchProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ value, onChange }: SearchProps) {
  return (
    <div className="relative flex  w-full h-12 text-font-secondary gap-4 items-center">
      <RiSearchLine className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="grow w-64 bg-background-secondary pl-16 pr-6 lg:pr-24 rounded-2xl h-full"
        placeholder="Search"
      />
      <div className="flex gap-4 h-full items-center w-fit lg:absolute right-6 ">
        <RiNotification3Line className="text-2xl shrink-0 hover:text-font hover:scale-105" />
        <Link to={"/profile"}>
          <img
            src="/Avatar.png"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
