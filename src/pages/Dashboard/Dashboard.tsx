import AddButton from "../../features/AddTask/components/AddButton";
import SearchBar from "../../components/SearchBar/SearchBar";
import TabSwitch from "../../components/TabSwitch/TabSwitch";
import Card from "../../features/Dashboard/components/Card";

function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col p-4 items-center gap-4 text-font overflow-hidden ">
      <SearchBar />
      <div className="w-full flex items-center justify-center lg:justify-between">
        <TabSwitch />
        <AddButton />
      </div>
      <div
        className="w-full flex-1 flex gap-4 overflow-x-auto lg:justify-between
        [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
      >
        <div
          className="w-11/12 flex flex-col shrink-0 gap-4
        lg:w-[calc(33.333%-1rem)] "
        >
          <h1 className="text-lg font-semibold">Working (03)</h1>
          <div
            className="w-full flex-1 overflow-y-auto shrink-0 flex flex-col gap-4 scroll-smooth 
                  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-background
  [&::-webkit-scrollbar-thumb]:bg-accent"
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div
          className="w-11/12 flex flex-col shrink-0 gap-4
          lg:w-[calc(33.333%-1rem)]"
        >
          <h1 className="text-lg font-semibold">In Progress (03)</h1>
          <div
            className="w-full flex-1 overflow-y-auto shrink-0 flex flex-col gap-4
            [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-background
        [&::-webkit-scrollbar-thumb]:bg-accent"
          >
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div
          className="w-11/12 flex flex-col shrink-0 gap-4
        lg:w-[calc(33.333%-1rem)]"
        >
          <h1 className="text-lg font-semibold">Completed (03)</h1>
          <div
            className="w-full flex-1 overflow-y-auto shrink-0 flex flex-col gap-4
            [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-background
          [&::-webkit-scrollbar-thumb]:bg-accent"
          >
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
