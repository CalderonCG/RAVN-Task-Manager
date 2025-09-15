import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type MessageProps =
  | {
      type: "message";
      isOpen: boolean;
      message: string;
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | {
      type: "error";
      message: string;
      isOpen: boolean;
      setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    };

function MessageModal({ type, isOpen, message, setIsOpen }: MessageProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (type === "error") {
          setIsOpen(null);
        } else {
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className="w-2/3 max-w-[42rem] space-y-2 bg-background-modal text-font py-8 px-4 rounded-lg
            flex flex-col items-center justify-center text-center"
        >
          {type === "error" ? (
            <ErrorMessage message={message} />
          ) : (
            <>
              {" "}
              <DialogTitle className="font-bold">Success</DialogTitle>
              <Description>{message}</Description>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default MessageModal;
