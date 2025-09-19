function TableHeader() {
  return (
    <div
      className="w-full h-14 items-center font-normal text-font bg-background-secondary px-4 gap-4 rounded-lg border-1 border-background-modal
    grid grid-cols-20"
    >
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-8">
        <p># Task Name</p>
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-3">
        <p>Task Tags</p>
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-2">
        <p>Estimate</p>
      </div>
      <div className="h-full w-full flex items-center border-r-2 border-background-modal col-span-4">
        <p>Task Assign Name</p>
      </div>
      <div className="h-full w-full flex items-center col-span-3">
        <p>Due date</p>
      </div>
    </div>
  );
}

export default TableHeader;
