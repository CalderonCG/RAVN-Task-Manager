import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiAddBoxFill } from "react-icons/ri";
import type { GetPointsQuery } from "../../../generated/graphql";
import { numberMap } from "../../../utils/DataMapper";
import { useMediaQuery } from "../../../utils/CustomHooks";

//Types---------------------------------
type ModalProps = {
  selectedValue: string | undefined;
  options: GetPointsQuery | undefined;
  isLoading: boolean;
  hasError: boolean;
  onSelect: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function PointsDropdown({
  selectedValue,
  isLoading,
  hasError,
  options,
  onSelect,
}: ModalProps) {
  //Handlers---------------------------------
  const handleSelect = (number: string) => {
    onSelect(number);
  };

  //Media query hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Menu>
      <MenuButton className="flex gap-2 w-full lg:w-auto ">
        {selectedValue === undefined ? (
          <span
            className="flex items-center justify-start gap-2 bg-modal-card-mobile py-2 px-4 rounded-sm w-full 
          lg:w-fit lg:justify-center lg:bg-modal-card"
          >
            <RiAddBoxFill className="text-xl" />
            <p>Estimate</p>
          </span>
        ) : (
          <span className="flex gap-2 w-full items-center text-font font-normal cursor-pointer  px-4 py-2">
            <RiAddBoxFill className="text-xl" />

            <p>{numberMap[selectedValue as keyof typeof numberMap]} Points</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor={isDesktop ? "bottom start" : undefined}
        className=" absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-none bg-modal-dropdown-mobile w-2/3 lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Estimate
          </span>
        </MenuItem>
        {isLoading ? (
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Loading...
          </span>
        ) : hasError ? (
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Something went wrong
          </span>
        ) : (
          options?.__type?.enumValues
            ?.slice()
            .sort((a, b) => {
              const valueA = numberMap[a.name as keyof typeof numberMap];
              const valueB = numberMap[b.name as keyof typeof numberMap];
              return Number(valueB) - Number(valueA);
            })
            .map((number) => {
              const value = number.name;
              const numberValue = numberMap[value as keyof typeof numberMap];
              return (
                <MenuItem key={numberValue}>
                  <span
                    className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                    onClick={() => handleSelect(number.name)}
                  >
                    <RiAddBoxFill />
                    <p>{numberValue} Points</p>
                  </span>
                </MenuItem>
              );
            })
        )}
      </MenuItems>
    </Menu>
  );
}

export default PointsDropdown;
