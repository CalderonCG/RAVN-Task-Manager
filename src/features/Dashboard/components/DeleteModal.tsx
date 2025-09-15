import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiQuestionLine } from "react-icons/ri";
import Button from "../../../components/Button/Button";
import { DELETE_TASK, GET_TASK } from "../../../queries/task";
import { useMutation } from "@apollo/client";

type DeleteProps = {
  isOpen: boolean;
  taskId: string;
  taskName: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteModal({ isOpen, taskId, taskName, setIsOpen }: DeleteProps) {
  //Queries-------------------------------------
  const [deleteTask] = useMutation(DELETE_TASK);

  //Functions ------------------------
  const handleDelete = async () => {
    try {
      await deleteTask({
        variables: {
          input: {
            id: taskId,
          },
        },
        refetchQueries: [{ query: GET_TASK }],
        awaitRefetchQueries: true,
      });
    } catch (error) {
      console.warn(error);
    }
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        <DialogPanel
          className="max-w-lg space-y-4 bg-background-modal text-font py-8 px-8 rounded-lg
            flex flex-col items-center justify-center text-center"
        >
          <RiQuestionLine className="text-5xl" />
          <DialogTitle className="font-bold">
            Deleting task: {taskName}
          </DialogTitle>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex gap-4">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => handleDelete()}>
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
