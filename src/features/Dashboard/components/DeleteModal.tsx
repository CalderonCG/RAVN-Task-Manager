import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCheckboxCircleLine, RiQuestionLine } from "react-icons/ri";
import Button from "../../../components/Button/Button";
import { DELETE_TASK, GET_TASK } from "../../../queries/task";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { client } from "../../../apolloClient";

type DeleteProps = {
  isOpen: boolean;
  taskId: string;
  taskName: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteModal({ isOpen, taskId, taskName, setIsOpen }: DeleteProps) {
  //States-----------------------------------------
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //Queries-------------------------------------
  const [deleteTask] = useMutation(DELETE_TASK);

  //Event handlers------------------------
  const handleDelete = async () => {
    try {
      const { data } = await deleteTask({
        variables: {
          input: {
            id: taskId,
          },
        },
      });
      if (data) {
        handleSuccess();
      }
    } catch (error) {
      if (error instanceof Error) handleError(error.message);
    }
  };

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      client.refetchQueries({
        include: [GET_TASK],
      });
    }, 2000);
  };

  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError(null);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        {showSuccess ? (
          <DialogPanel
            className="w-full lg:w-1/3 space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center text-center"
          >
            <RiCheckboxCircleLine className="text-6xl" />
            <p className="text-lg font-bold">Task deleted successfully</p>
          </DialogPanel>
        ) : error ? (
          <DialogPanel
            className="w-full lg:w-1/3 space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center text-center"
          >
            <ErrorMessage message={error} />
          </DialogPanel>
        ) : (
          <DialogPanel
            className="w-full lg:w-1/3  space-y-4 bg-background-modal text-font py-8 px-8 rounded-lg
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
        )}
      </div>
    </Dialog>
  );
}

export default DeleteModal;
