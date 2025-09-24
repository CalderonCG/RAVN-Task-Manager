import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiPriceTag3Fill, RiSquareFill, RiSquareLine } from "react-icons/ri";
import type { MouseEvent } from "react";
import type { GetTagsQuery, TaskTag } from "../../../generated/graphql";
import type { TagAction } from "../../../utils/TaskTypes";
import { tagMap } from "../../../utils/DataMapper";
import { useMediaQuery } from "../../../utils/CustomHooks";

//Types---------------------------------------------
type ModalProps = {
  selectedValue: TaskTag[];
  isLoading: boolean;
  hasError: boolean;
  options: GetTagsQuery | undefined;
  onSelect: React.ActionDispatch<[action: TagAction]>;
};

function TagDropdown({
  selectedValue,
  isLoading,
  hasError,
  options,
  onSelect,
}: ModalProps) {
  //Media query hook
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  //Handlers---
  const handleClick = (event: MouseEvent, action: TagAction) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(action);
  };

  return (
    <Menu>
      <MenuButton className="flex gap-2 w-full lg:w-auto ">
        {selectedValue.length === 0 ? (
          <span
            className="flex items-center justify-start gap-2 bg-modal-card-mobile py-2 px-4 rounded-sm w-full 
          lg:w-fit lg:justify-center lg:bg-modal-card"
          >
            <RiPriceTag3Fill className="text-xl" />
            <p>Label</p>
          </span>
        ) : (
          <div className="flex gap-1 w-full items-center text-font font-normal cursor-pointer ">
            <span className="flex items-center justify-center gap-2 lg:bg-modal-card bg-modal-card-mobile py-2 px-4 rounded-sm ">
              {tagMap[selectedValue[0] as TaskTag]}
            </span>
            {selectedValue.length > 1 && (
              <span
                className="flex items-center justify-center gap-2 bg-modal-card-mobile lg:bg-modal-card py-2 px-2 rounded-sm"
                title={selectedValue
                  .slice(1)
                  .map((tag) => tagMap[tag as TaskTag])
                  .join(", ")}
              >
                +{selectedValue.length - 1}
              </span>
            )}
          </div>
        )}
      </MenuButton>
      <MenuItems
        anchor={isDesktop ? "bottom start" : undefined}
        className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-none bg-modal-dropdown-mobile w-2/3 lg:w-auto lg:bg-background-modal border-1 border-accent-hover rounded-lg text-font mt-2 flex flex-col"
      >
        <MenuItem>
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Tag Title
          </span>
        </MenuItem>
        {isLoading ? (
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Loading...
          </span>
        ) : hasError ? (
          <span className="text-font-secondary font-semibold text-lg  px-4 py-2 cursor-default">
            Something went wrong
          </span>
        ) : (
          options?.__type?.enumValues?.map((tag, index) => (
            <MenuItem key={index}>
              {!selectedValue.find((value) => value === tag.name) ? (
                <span
                  className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                  onClick={(e) =>
                    handleClick(e, {
                      type: "Add",
                      value: tag.name as TaskTag,
                    })
                  }
                >
                  <RiSquareLine />
                  <p>{tagMap[tag.name as TaskTag]}</p>
                </span>
              ) : (
                <span
                  className="flex gap-2 items-center text-font font-normal hover:bg-modal-card cursor-pointer  px-4 py-2"
                  onClick={(e) =>
                    handleClick(e, {
                      type: "Remove",
                      value: tag.name as TaskTag,
                    })
                  }
                >
                  <RiSquareFill />
                  <p>{tagMap[tag.name as TaskTag]}</p>
                </span>
              )}
            </MenuItem>
          ))
        )}
      </MenuItems>
    </Menu>
  );
}

export default TagDropdown;
