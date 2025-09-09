import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound/NotFound";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <div className="bg-background w-full h-screen text-font flex flex-col-reverse
    lg:flex-row lg:p-8">
      <SideBar/>
      <Routes>
        {/* Home element with highest rated anime listing */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
