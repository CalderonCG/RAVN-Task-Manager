import { RiArrowDownSFill } from "react-icons/ri";

function Table() {
  return (
    <div className="bg-background-secondary w-fit min-w-full">
      <div className="w-full rounded-sm py-1 px-4 text-lg flex items-center gap-4">
        <RiArrowDownSFill />
        <p>To Do</p>
        <p className="text-font-secondary">(05)</p>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Table;
