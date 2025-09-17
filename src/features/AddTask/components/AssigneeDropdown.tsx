import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiUser3Fill } from "react-icons/ri";
import type { GetUsersQuery } from "../../../generated/graphql";
import type { User } from "../../../utils/TaskTypes";
import { useState } from "react";
import { useMediaQuery } from "../../../utils/CustomHooks";

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
  //Media query hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  //States
  const [search, setSearch] = useState("");

  const filteredUsers = options?.users.filter((user) =>
    user.fullName.toLowerCase().startsWith(search.toLowerCase().trim()),
  );

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
              className="w-6 rounded-full"
              src="/Avatar.png"
              alt={selectedValue.fullName}
            />
            <p>{selectedValue.fullName}</p>
          </span>
        )}
      </MenuButton>
      <MenuItems
        anchor={isDesktop ? "bottom start" : undefined}
        className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-none bg-modal-dropdown-mobile w-2/3 lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col
"
      >
        <MenuItem>
          <input
            className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default"
            value={search}
            placeholder="Assign to..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </MenuItem>
        <div
          className=" max-h-64  w-full  overflow-y-auto          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
        >
          {isLoading
            ? "Loading..."
            : filteredUsers?.map((user) => (
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
                    <img
                      className="w-8 rounded-full"
                      src="/Avatar.png"
                      alt={user.fullName}
                    />
                    <p>{user.fullName}</p>
                  </span>
                </MenuItem>
              ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default AssigneeDropdown;
