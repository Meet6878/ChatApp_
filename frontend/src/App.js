import "./App.css";
import { Route, Routes } from "react-router-dom";
import Ragister from "./pages/Ragister";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar from "./components/SetAvatar";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/ragister" element={<Ragister />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/setavatar" element={<SetAvatar />} />
        <Route exact path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
