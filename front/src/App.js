import { Link } from 'react-router-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import { Chat } from './pages/chat/Chats';
import { NewRoom } from './pages/new_room/NewRoom';
import { RoomsList } from './pages/Top';
import { Login }  from './pages/login/Login';


function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> |{' '}
                <Link to="/login">ログイン</Link> |{' '}
                <Link to="/mypage">MyPage</Link> |{' '}
            </nav>
            <Routes>
                <Route path="/" element={<RoomsList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/rooms/new" element={<NewRoom />} />
                <Route path="/rooms/:id" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
