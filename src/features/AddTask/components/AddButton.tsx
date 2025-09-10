import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import AssigneeDropdown from "./AssigneeDropdown";
import PointsDropdown from "./PointsDropdown";

function AddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string | undefined>(
    undefined,
  );

  const [selectedPoints, setSelectedPoints] = useState<number | undefined>(
    undefined,
  );

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
            className="w-1/2 max-w-[42rem] space-y-4 bg-background-modal text-font p-4 rounded-lg
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
            </div>
            <div className="w-full flex justify-end gap-2">
              <button className=" p-2 rounded-lg hover:bg-accent">
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

// <button
//   className="py-1 px-6 w-1/2 rounded-lg items-center justify-center hidden  lg:bg-primary lg:hover:scale-105
//       lg:flex lg:w-fit lg:p-2 "
// >
//   <RiAddLine className="text-3xl text-font" />
// </button>
