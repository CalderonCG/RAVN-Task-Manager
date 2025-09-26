import { Menu, MenuButton, MenuItems } from "@headlessui/react";

import type { TaskTag } from "../../../generated/graphql";
import { tagMap } from "../../../utils/DataMapper";
import { RiCloseFill } from "react-icons/ri";

type FilterDropdownType = {
  removeTag: (tagToRemove: TaskTag) => void;
  tags: TaskTag[];
};

function FilterDropdown({ tags, removeTag }: FilterDropdownType) {
  return (
    <Menu>
      <MenuButton
        className={`py-1 px-3 bg-accent text-font w-fit rounded-sm flex  items-center justify-between gap-2 cursor-pointer`}
      >
        {tags.length} tags
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="data-focus:bg-accent-hover z-50 p-2 hover:bg-accent items-center gap-2 cursor-pointer w-32 flex justify-between"
          >
            {tagMap[tag]}
            <RiCloseFill
              className="text-lg cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}
      </MenuItems>
    </Menu>
  );
}

export default FilterDropdown;
