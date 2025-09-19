import ListContainer from "../../features/TaskList/ListContainer";
import ListHeader from "../../features/TaskList/ListHeader";

function Tasks() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-8">
      <ListHeader />
      <ListContainer />
    </div>
  );
}

export default Tasks;
