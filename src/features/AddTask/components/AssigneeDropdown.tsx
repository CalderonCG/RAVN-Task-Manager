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
      <MenuButton className="flex gap-2">
        {selectedValue === null ? (
          <span className="flex items-center justify-center gap-2 bg-modal-card py-2 px-4 rounded-sm">
            <RiUser3Fill />
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
        className="bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 w-[16rem] flex flex-col"
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
