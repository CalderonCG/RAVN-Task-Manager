import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiTodoLine } from "react-icons/ri";
import type { GetStatusQuery, Status } from "../../../generated/graphql";
import type { StatusType } from "../../../utils/TaskTypes";
import { statusMap } from "../../../utils/DataMapper";
import { useMediaQuery } from "../../../utils/CustomHooks";

//Types-----------------------------------------
type ModalProps = {
  selectedValue: StatusType;
  options: GetStatusQuery | undefined;
  isLoading: boolean;
  isFilter?: boolean;
  onSelect: React.Dispatch<React.SetStateAction<StatusType>>;
};

function StatusDropdown({
  selectedValue,
  isLoading,
  isFilter = false,
  options,
  onSelect,
}: ModalProps) {
  //Media query hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  //handlers---
  const handleSelect = (status: StatusType) => {
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

            <p>{statusMap[selectedValue as StatusType]}</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor={isDesktop ? "bottom start" : undefined}
        className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-none bg-modal-dropdown-mobile w-2/3 lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Status
          </span>
        </MenuItem>
        {isFilter && (
          <MenuItem>
            <span
              className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
              onClick={() => handleSelect("ALL" as StatusType)}
            >
              <p>All</p>
            </span>
          </MenuItem>
        )}

        {isLoading
          ? "Loading..."
          : options?.__type?.enumValues?.map((status) => {
              return (
                <MenuItem key={status.name}>
                  <span
                    className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                    onClick={() => handleSelect(status.name as Status)}
                  >
                    <p>{statusMap[status.name as StatusType]}</p>
                  </span>
                </MenuItem>
              );
            })}
      </MenuItems>
    </Menu>
  );
}

export default StatusDropdown;
