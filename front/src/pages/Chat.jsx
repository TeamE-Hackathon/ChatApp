// import './Chat1.css';
import { Divider, Input } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToButtom from 'react-scroll-to-bottom';
import io from 'socket.io-client';
import { SendMessageButton } from '../components/button/SendMessageButton';


export const NewChat = () => {
  const socket = io.connect('http://localhost:3001');
  // const socket = io.connect(`${process.env.REACT_APP_BASEURL}:3001`); // eslint-disable-line

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
      // const messageData = { 
      //   'roomName': roomName,
      //   'userName': userName,
      //   'message': currentMessage,
      //   'createdAt': new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      // };

      // await socket.emit('send_message', messageData);
      // my new mesage
      // setMessageList((list) => [...list, messageData]);
      setcurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('receive_message;', data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //css in js

  const Body = styled('div')({
    backgroundColor: '#E3F1FC'
  });

  const RoomName = styled('div')({
    fontSize: '20px',
    fontWeight: '800',
  });


  return (
    <Body>
      {/* <div className='chat-window'> */}
      <Container sx={{bgcolor:'white', height: '50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        {/* <div className='chat-header'> */}
        <RoomName>
          <p>{roomName} </p>
        </RoomName>
        {/* </div> */}
      </Container>
      <Divider color='#1976d2' />
      <Container maxWidth='lg' sx={{bgcolor: 'white', height: '72vh'}}>
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
      </Container>
      <Divider color='#1976d2' />
      <Container maxWidth='lg' sx={{ bgcolor: 'white' }}>
        <div className='chat-footer'>
          <Input
            type='text'
            value={currentMessage}
            placeholder='hey..'
            onChange={(e) => {
              setcurrentMessage(e.target.value);
            }}
            sx={{width: '80vh', height:'9vh', fontSize:'25px'}}
          />
          {/* TODO: EnterKeyでも送信できるようにする？*/}
          <SendMessageButton onClick={sendMessage} />
        </div>
      </Container>
      {/* </div> */}
    </Body>
  );
};

NewChat.propTypes = {
  socket: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

