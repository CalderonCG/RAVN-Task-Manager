import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { RiNotification3Line } from "react-icons/ri";
import { avatarGenerator } from "../../utils/AvatarGenerator";

function NotificationDropdown() {
  return (
    <Menu>
      <MenuButton>
        <RiNotification3Line className="text-2xl shrink-0 hover:text-font hover:scale-105 cursor-pointer" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className={
          "bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2"
        }
      >
        <span className="data-focus:bg-accent-hover z-50 p-2 hover:bg-accent items-center gap-2 cursor-pointer w-52    flex ">
          <img
            src={avatarGenerator("Notif")}
            alt="notifAvatar"
            className="w-8 rounded-full"
          />
          <div className="flex-1">
            <p>Username</p>
            <p>Sent you a message</p>
          </div>
        </span>
        <span className="data-focus:bg-accent-hover z-50 p-2 hover:bg-accent items-center gap-2 cursor-pointer w-52    flex ">
          <img
            src={avatarGenerator("Notif2")}
            alt="notifAvatar"
            className="w-8 rounded-full"
          />
          <div className="flex-1">
            <p>Username 2</p>
            <p>Approved your task</p>
          </div>
        </span>
      </MenuItems>
    </Menu>
  );
}

export default NotificationDropdown;
