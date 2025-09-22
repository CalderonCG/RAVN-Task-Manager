import { useEffect } from "react";
//This component just syncs the open state of the dropdown with the state in the dashboard that controls de drag and drop
function DropdownWrapper({
  open,
  setIsOpen,
  children,
}: {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  useEffect(() => {
    setIsOpen(open);
  }, [open, setIsOpen]);

  return <>{children}</>;
}

export default DropdownWrapper;
