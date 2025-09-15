import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiUser3Fill } from "react-icons/ri";
import type { GetUsersQuery } from "../../../generated/graphql";
import type { User } from "../../../utils/TaskTypes";

type ModalProps = {
  selectedValue: User | undefined;
  isLoading: boolean;
  options: GetUsersQuery | undefined;
  onSelect: React.Dispatch<React.SetStateAction<User | undefined>>;
};

function AssigneeDropdown({
  selectedValue,
  isLoading,
  options,
  onSelect,
}: ModalProps) {
  const handleSelect = (user: User) => {
    onSelect(user);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2 w-full lg:w-auto ">
        {selectedValue === undefined ? (
          <span
            className="flex items-center justify-start gap-2 bg-modal-card-mobile py-2 px-4 rounded-sm w-full 
          lg:w-fit lg:justify-center lg:bg-modal-card"
          >
            <RiUser3Fill className="text-xl" />
            <p>Assignee</p>
          </span>
        ) : (
          <span className="flex gap-2 w-full items-center text-font font-normal cursor-pointer  px-4 py-2">
            <img
              className="w-6"
              src="/Avatar.png"
              alt={selectedValue.fullName}
            />
            <p>{selectedValue.fullName}</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-modal-card-mobile w-[calc(100%-2rem)] lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Assign To...
          </span>
        </MenuItem>
        {isLoading
          ? "Loading..."
          : options?.users.map((user) => (
              <MenuItem key={user.id}>
                <span
                  className="flex gap-2 w-full items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                  onClick={() =>
                    handleSelect({
                      __typename: "User",
                      id: user.id,
                      fullName: user.fullName,
                    })
                  }
                >
                  <img className="w-8" src="/Avatar.png" alt={user.fullName} />
                  <p>{user.fullName}</p>
                </span>
              </MenuItem>
            ))}
      </MenuItems>
    </Menu>
  );
}

export default AssigneeDropdown;
