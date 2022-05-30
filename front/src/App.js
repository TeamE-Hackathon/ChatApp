import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import { NewChat } from './pages/Chat';
import { NewRoom } from './pages/new_room/NewRoom';
import { SignIn } from './pages/signin/SignIn';
import { SignUp } from './pages/signup/SignUp';
import { RoomsList } from './pages/Top';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Header />
        {/* <Link to='/'>Home</Link> | <Link to='/login'>ログイン</Link> | <Link to='/mypage'>MyPage</Link> |{' '}
        <Link to='/rooms/new'>部屋作る</Link> */}
      </nav>
      <Routes>
        <Route path='/' element={<RoomsList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/rooms/new' element={<NewRoom />} />
        <Route path='/rooms/:id' element={<NewChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
