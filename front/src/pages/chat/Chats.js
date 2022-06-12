import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToButtom from 'react-scroll-to-bottom';
import io from 'socket.io-client';
import { SendMessageButton } from '../../components/button/SendMessageButton';
import './Chat.css';

const socket = io.connect(`${process.env.REACT_APP_BASEURL}:3001`); // eslint-disable-line
export const Chat = () => {

  // get pass props
  const location = useLocation();
  const { roomName } = location.state;

  // ToDo: dbからその部屋の名前でデータを取得する
  // 部屋が作られていない場合は、アラート出してTOPページに遷移

  // ToDo: ログインユーザーを取得
  let userName = 'sato';

  // emit join event
  const joinRoom = () => {
    if (userName !== '' && roomName !== '') {
      console.log('join the room: ', roomName);
      socket.emit('join_room', roomName);
    }
  };
  useEffect(() => {
    joinRoom();
  }, []);

  const [currentMessage, setcurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        'roomName': roomName,
        'userName': userName,
        'message': currentMessage,
        'createdAt': new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      // my new mesage
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('receive_message;', data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>{roomName} </p>
      </div>
      <div className='chat-body'>
        <ScrollToButtom className='message-container'>
          {messageList.map((messageContent, index) => {
            console.log('mesageContent', messageContent);
            return (
              <div key={index} className='message' id={userName === messageContent.userName ? 'you' : 'other'}>
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='createdAt'>{messageContent.createdAt}</p>
                    <p id='userName'>{messageContent.userName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToButtom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='hey..'
          onChange={(e) => {
            setcurrentMessage(e.target.value);
          }}
        />
        {/* TODO: EnterKeyでも送信できるようにする？*/}
        <SendMessageButton onClick={sendMessage} />
      </div>
    </div>
  );
};