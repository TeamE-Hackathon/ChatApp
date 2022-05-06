import './App.css';
import io from 'socket.io-client'

import { useState } from 'react'
import Chat from '../chat/Chats'

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Welcom Chat</h3>
          <input
            type="text"
            placeholder="名前を入力してください"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="RoomIDを入力してください"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
