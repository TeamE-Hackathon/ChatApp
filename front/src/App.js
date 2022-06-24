import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
// import { Chat } from './pages/chat/Chats';
import { NewChat } from './pages/Chat';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { SnsSignIn } from './pages/SnsSignIn';
import { RoomsList } from './pages/Top';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route path='/' element={<RoomsList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path='/rooms/:roomName' element={<Chat />} /> */}
        <Route path='/rooms/:roomName' element={<NewChat />} />
        {/* ToDo: MUIで焼き直す */}
        <Route path='/sns-signin' element={<SnsSignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
