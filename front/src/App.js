import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Chat } from "./pages/chat/Chats";
import { Login } from "./pages/login/Login";
import { NewRoom } from "./pages/new_room/NewRoom";
import { Rooms } from "./pages/rooms/Rooms";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">ログイン</Link> | <Link to="/mypage">MyPage</Link> |{" "}
        <Link to="/rooms/new">部屋作る</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        <Route path="/rooms/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
