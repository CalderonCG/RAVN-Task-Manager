import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";

function Dropdown() {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDots className="text-2xl text-font-secondary " />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="bg-background-modal border-1 border-accent-hover rounded-lg  text-font mt-2"
      >
        <MenuItem>
          <span className=" data-focus:bg-accent-hover p-2 flex items-center gap-2 cursor-pointer ">
            <RiEditLine className="text-lg" />
            <p>Edit</p>
          </span>
        </MenuItem>

        <MenuItem>
          <span className=" data-focus:bg-accent-hover p-2 flex items-center gap-2 cursor-pointer">
            <RiDeleteBin7Line className="text-lg" />
            <p>Delete</p>
          </span>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
