import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { RiAddBoxFill } from "react-icons/ri";
import type { GetPointsQuery } from "../../../generated/graphql";
import { numberMap } from "../../../utils/DataMapper";

type ModalProps = {
  selectedValue: number | undefined;
  options: GetPointsQuery | undefined;
  isLoading: boolean;
  onSelect: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function PointsDropdown({
  selectedValue,
  isLoading,
  options,
  onSelect,
}: ModalProps) {
  const handleSelect = (number: number) => {
    onSelect(number);
  };

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

            <p>{selectedValue} Points</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-modal-card-mobile w-[calc(100%-2rem)] lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Estimate
          </span>
        </MenuItem>
        {isLoading
          ? "Loading..."
          : options?.__type?.enumValues?.map((number) => {
              const value = number.name;
              const numberValue = numberMap[value as keyof typeof numberMap];
              return (
                <MenuItem key={numberValue}>
                  <span
                    className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                    onClick={() => handleSelect(numberValue)}
                  >
                    <RiAddBoxFill />
                    <p>{numberValue} Points</p>
                  </span>
                </MenuItem>
              );
            })}
      </MenuItems>
    </Menu>
  );
}

export default PointsDropdown;
