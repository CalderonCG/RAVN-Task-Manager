import { Dialog, DialogPanel } from "@headlessui/react";
import { useReducer, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import AssigneeDropdown from "./AssigneeDropdown";
import PointsDropdown from "./PointsDropdown";
import TagDropdown from "./TagDropdown";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";
import Button from "../../../components/Button/Button";

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
      <Button
        variant="neutral"
        visibility="desktop"
        onClick={() => setIsOpen(true)}
      >
        <RiAddLine className="text-3xl text-font" />
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          <DialogPanel
            className="w-2/3 max-w-[42rem] space-y-4 bg-background-modal text-font p-4 rounded-lg
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
              <DateButton />
            </div>
            <div className="w-full flex justify-end gap-8">
              <Button variant="neutral" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Update
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default AddButton;
