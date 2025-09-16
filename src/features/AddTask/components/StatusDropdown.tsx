import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { RiTodoLine } from "react-icons/ri";
import type { GetStatusQuery, Status } from "../../../generated/graphql";

type ModalProps = {
  selectedValue: Status;
  options: GetStatusQuery | undefined;
  isLoading: boolean;
  onSelect: React.Dispatch<React.SetStateAction<Status>>;
};

function StatusDropdown({
  selectedValue,
  isLoading,
  options,
  onSelect,
}: ModalProps) {
  const handleSelect = (status: Status) => {
    onSelect(status);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2 w-full lg:w-auto ">
        {selectedValue === undefined ? (
          <span
            className="flex items-center justify-start gap-2 bg-modal-card-mobile py-2 px-4 rounded-sm w-full 
          lg:w-fit lg:justify-center lg:bg-modal-card"
          >
            <RiTodoLine className="text-xl" />
            <p>Status</p>
          </span>
        ) : (
          <span className="flex gap-2 w-full items-center bg-modal-card-mobile lg:bg-modal-card text-font font-normal cursor-pointer  px-4 py-2">
            <RiTodoLine className="text-xl" />

            <p>{selectedValue}</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-modal-card-mobile w-[calc(100%-2rem)] lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Status
          </span>
        </MenuItem>
        {isLoading
          ? "Loading..."
          : options?.__type?.enumValues?.map((status) => {
              return (
                <MenuItem key={status.name}>
                  <span
                    className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                    onClick={() => handleSelect(status.name as Status)}
                  >
                    <p>{status.name}</p>
                  </span>
                </MenuItem>
              );
            })}
      </MenuItems>
    </Menu>
  );
}

export default StatusDropdown;
