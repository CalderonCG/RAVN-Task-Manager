import { Dialog, DialogPanel } from "@headlessui/react";
import { useReducer, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import AssigneeDropdown from "./AssigneeDropdown";
import PointsDropdown from "./PointsDropdown";
import TagDropdown from "./TagDropdown";

//Types------------
type User = {
  id: string;
  name: string;
  avatar: string;
};

export type TagAction = {
  type: "Add" | "Remove";
  value: string;
};

//Reducer-----------------
const tagsReducer = (state: string[], action: TagAction) => {
  switch (action.type) {
    case "Add":
      return [...state, action.value];
    case "Remove":
      return state.filter((tag) => tag != action.value);
    default:
      return state;
  }
};

function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<User | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<number | undefined>(
    undefined,
  );
  const [tags, dispatch] = useReducer(tagsReducer, []);

  return (
    <>
      <button
        className="py-1 px-6 w-1/2 rounded-lg items-center justify-center hidden  lg:bg-primary lg:hover:scale-105 lg:hover:bg-primary-hover
    lg:flex lg:w-fit lg:p-2 "
        onClick={() => setIsOpen(true)}
      >
        <RiAddLine className="text-3xl text-font" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          <DialogPanel
            className="w-2/3 max-w-[40rem] space-y-4 bg-background-modal text-font p-4 rounded-lg
          "
          >
            <input
              type="text"
              placeholder="Task Name..."
              className="w-full p-2 text-xl font-semibold"
            />
            <div className="flex gap-4">
              <PointsDropdown
                selectedValue={selectedPoints}
                onSelect={setSelectedPoints}
              />
              <AssigneeDropdown
                selectedValue={selectedAssignee}
                onSelect={setSelectedAssignee}
              />
              <TagDropdown selectedValue={tags} onSelect={dispatch} />
            </div>
            <div className="w-full flex justify-end gap-2">
              <button
                className=" p-2 rounded-lg hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="bg-primary p-2 rounded-lg hover:bg-primary-hover ">
                Update
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default AddButton;
