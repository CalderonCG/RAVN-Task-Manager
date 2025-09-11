import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiPriceTag3Fill, RiSquareFill, RiSquareLine } from "react-icons/ri";
import type { TagAction } from "./AddButton";
import type { MouseEvent } from "react";

type ModalProps = {
  selectedValue: string[];
  onSelect: React.ActionDispatch<[action: TagAction]>;
};

const tags = ["IOS", "Android", "React", "Node"];

function TagDropdown({ selectedValue, onSelect }: ModalProps) {
  const handleClick = (event: MouseEvent, action: TagAction) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(action);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2">
        {selectedValue.length === 0 ? (
          <span className="flex items-center justify-center gap-2 bg-modal-card py-2 px-4 rounded-sm">
            <RiPriceTag3Fill className="text-xl" />
            <p>Label</p>
          </span>
        ) : (
          <div className="flex gap-1 w-full items-center text-font font-normal cursor-pointer ">
            <span className="flex items-center justify-center gap-2 bg-modal-card py-2 px-4 rounded-sm">
              {selectedValue[0]}
            </span>
            {selectedValue.length > 1 && (
              <span
                className="flex items-center justify-center gap-2 bg-modal-card py-2 px-2 rounded-sm"
                title={selectedValue.slice(1).toString()}
              >
                +{selectedValue.length - 1}
              </span>
            )}
          </div>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-background-modal border-1 w-42 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Tag Title
          </span>
        </MenuItem>
        {tags.map((tag, index) => (
          <MenuItem key={index}>
            {!selectedValue.find((value) => value === tag) ? (
              <span
                className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                onClick={(e) => handleClick(e, { type: "Add", value: tag })}
              >
                <RiSquareLine />
                <p>{tag}</p>
              </span>
            ) : (
              <span
                className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                onClick={(e) => handleClick(e, { type: "Remove", value: tag })}
              >
                <RiSquareFill />
                <p>{tag}</p>
              </span>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default TagDropdown;
