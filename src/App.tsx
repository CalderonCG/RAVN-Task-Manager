import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import User from "./pages/User/User";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="bg-background w-full h-screen text-font flex flex-col-reverse
    lg:flex-row lg:p-8"
    >
      <SideBar setIsOpen={setIsOpen} />
      <Routes>
        <Route
          path="/"
          element={<Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/MyTasks" element={<Tasks />} />
        <Route path="/Profile" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
