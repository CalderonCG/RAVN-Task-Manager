import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiUser3Fill } from "react-icons/ri";

type ModalProps = {
  selectedValue: User | null;
  onSelect: React.Dispatch<React.SetStateAction<User | null>>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

const Users: User[] = [
  {
    id: "1",
    name: "Chris Calderon",
    avatar: "/Avatar.png",
  },
  {
    id: "2",
    name: "Toph",
    avatar: "/Avatar.png",
  },
];

function AssigneeDropdown({ selectedValue, onSelect }: ModalProps) {
  const handleSelect = (user: User) => {
    onSelect(user);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2 w-full lg:w-auto ">
        {selectedValue === null ? (
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
              src={selectedValue.avatar}
              alt={selectedValue.name}
            />
            <p>{selectedValue.name}</p>
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
        {Users.map((user) => (
          <MenuItem key={user.id}>
            <span
              className="flex gap-2 w-full items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
              onClick={() => handleSelect(user)}
            >
              <img className="w-8" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default AssigneeDropdown;
