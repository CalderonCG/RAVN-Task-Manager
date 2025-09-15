import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { type PropsWithChildren } from "react";
import { BsThreeDots } from "react-icons/bs";

function Dropdown({ children }: PropsWithChildren) {
  return (
    <Menu>
      <MenuButton>
        <BsThreeDots className="text-2xl text-font-secondary " />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="bg-background-modal border-1 border-accent-hover rounded-lg  text-font mt-2"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;
