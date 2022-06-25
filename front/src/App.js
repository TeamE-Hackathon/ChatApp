import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import { NewChat } from './pages/Chat';
import { MyPage } from './pages/MyPage';
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
        <Route path='/sns-signin' element={<SnsSignIn />} />
        <Route path='/mypages/:userName' element={<MyPage />} />
        <Route path='/rooms/:roomName' element={<NewChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
