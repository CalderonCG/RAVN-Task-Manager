import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  return (
    <div
      className="bg-background w-full h-screen text-font flex flex-col-reverse
    lg:flex-row lg:p-8"
    >
      <SideBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/MyTasks" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
