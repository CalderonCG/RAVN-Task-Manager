import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { RiUser3Fill } from "react-icons/ri";

type ModalProps = {
  selectedValue: number | undefined;
  onSelect: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const estimatePoints = [0, 1, 2, 4, 8];

function PointsDropdown({ onSelect }: ModalProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined);

  const handleSelect = (number: number) => {
    onSelect(number);
    setSelected(number);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2">
        {selected === null ? (
          <span className="flex items-center justify-center gap-2 bg-modal-card py-2 px-4 rounded-sm">
            <RiUser3Fill />
            <p>Assignee</p>
          </span>
        ) : (
          <span className="flex gap-2 w-full items-center text-font font-normal cursor-pointer  px-4 py-2"></span>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 w-[16rem] flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2">
            Assign To...
          </span>
        </MenuItem>
        {estimatePoints.map((number) => (
          <MenuItem key={number}>
            <span
              className="flex gap-2 w-full items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
              onClick={() => handleSelect(number)}
            ></span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default PointsDropdown;
