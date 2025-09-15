import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiQuestionLine } from "react-icons/ri";
import Button from "../../../components/Button/Button";

type DeleteProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteModal({ isOpen, setIsOpen }: DeleteProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        <DialogPanel
          className="max-w-lg space-y-4 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center text-center"
        >
          <RiQuestionLine className="text-5xl" />
          <DialogTitle className="font-bold">Deleting task: Name</DialogTitle>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex gap-4">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
