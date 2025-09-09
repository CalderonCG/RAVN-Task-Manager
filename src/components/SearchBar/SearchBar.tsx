
import { RiNotification3Line, RiSearchLine } from "react-icons/ri";

function SearchBar() {
  return (
    <div className="relative flex w-full h-12 text-font-secondary gap-2 items-center">
      <RiSearchLine className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl" />
      <input
        type="text"
        className="grow w-64 bg-background-secondary pl-16 pr-6 lg:pr-24 rounded-2xl h-full"
        placeholder="Search"
      />
      <div className="flex gap-2 h-full items-center w-fit lg:absolute right-6 ">
        <RiNotification3Line className="text-2xl shrink-0" />
        <img src="/Avatar.png" alt="avatar" className="w-8 h-8" />
      </div>
    </div>
  );
}

export default SearchBar;
