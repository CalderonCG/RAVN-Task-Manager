import { Route, Routes } from "react-router";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return <div className="bg-background w-full h-screen text-font">
      <Routes>
        {/* Home element with highest rated anime listing */}
        <Route path="*" element={<NotFound/>} />

      </Routes>
  </div>;
}

export default App;