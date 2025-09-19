import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { type PropsWithChildren } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropdownWrapper from "./DropdownWrapper";

//Types-------------------------------------
type DropdownType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Dropdown({ setIsOpen, children }: PropsWithChildren<DropdownType>) {
  return (
    <Menu as="div" className="relative inline-block touch-none">
      {({ open }) => (
        <DropdownWrapper open={open} setIsOpen={setIsOpen}>
          <>
            <MenuButton>
              <BsThreeDots className="text-2xl text-font-secondary touch-none" />
            </MenuButton>

            <MenuItems
              anchor="bottom end"
              className="bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2"
            >
              {children}
            </MenuItems>
          </>
        </DropdownWrapper>
      )}
    </Menu>
  );
}

export default Dropdown;
