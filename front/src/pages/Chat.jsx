// import './Chat1.css';
import { Divider, Input } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollToButtom from 'react-scroll-to-bottom';
import io from 'socket.io-client';
import { SendMessageButton } from '../components/button/SendMessageButton';

const socket = io.connect(`${process.env.REACT_APP_BASEURL}:3001`); // eslint-disable-line
export const NewChat = () => {
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
        roomName: roomName,
        userName: userName,
        message: currentMessage,
        createdAt: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
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

  //css in js

  const Body = styled('div')({
    backgroundColor: '#E3F1FC',
  });

  const RoomName = styled('div')({
    fontSize: '20px',
    fontWeight: '800',
  });

  const ChatMessage = styled('div')({
    width: 'auto',
    height: 'auto',
    minHeight: '40px',
    maxWidth: '200px',
    backgroundColor: '#1976d2',
    borderRadius: '5px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    marginLeft: '5px',
    paddingRight: '5px',
    paddingLeft: '5px',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  });

  const MessageMeta = styled('div')({
    fontSize: '12px',
    marginTop: '-5px',
    display: 'flex',
    justifyContent: 'flex-start',
  });

  const MessageName = styled('div')({
    marginLeft: '10px',
  });

  return (
    <Body>
      <Container maxWidth='lg' sx={{ bgcolor: 'white', borderLeft: 3, borderRight: 3, borderColor: '#1976d2' }}>
        <Container sx={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RoomName>
            <p>{roomName} </p>
          </RoomName>
        </Container>
        <Container sx={{ marginBottom: '5px' }}>
          <Divider color='#1976d2' sx={{ borderBottomWidth: 3 }} />
        </Container>
        <Container sx={{ height: '70vh' }}>
          <div className='chat-body'>
            <ScrollToButtom className='message-container'>
              {messageList.map((messageContent, index) => {
                console.log('mesageContent', messageContent);
                return (
                  <div
                    key={index}
                    sx={
                      userName === messageContent.userName
                        ? { justifyContent: 'flex-start' }
                        : { justifyContent: 'flex-end' }
                    }
                  >
                    <div>
                      <ChatMessage>
                        <p>{messageContent.message}</p>
                      </ChatMessage>
                      <MessageMeta>
                        <p id='createdAt'>{messageContent.createdAt}</p>
                        <MessageName>
                          <p id='userName'>{messageContent.userName}</p>
                        </MessageName>
                      </MessageMeta>
                    </div>
                  </div>
                );
              })}
            </ScrollToButtom>
          </div>
        </Container>
        <Container>
          <Divider color='#1976d2' sx={{ borderBottomWidth: 3 }} />
        </Container>
        <Container sx={{ bgcolor: 'white', display: 'flex', justifyContent: 'center', paddingBottom: '9px' }}>
          <div className='chat-footer'>
            <Input
              type='text'
              value={currentMessage}
              placeholder='hey..'
              onChange={(e) => {
                setcurrentMessage(e.target.value);
              }}
              sx={{ width: '55vw', height: '9vh', fontSize: '25px' }}
            />
            {/* TODO: EnterKeyでも送信できるようにする？*/}
            <SendMessageButton onClick={sendMessage} />
          </div>
        </Container>
      </Container>
    </Body>
  );
};

// NewChat.propTypes = {
//   socket: PropTypes.string.isRequired,
//   userName: PropTypes.string.isRequired,
//   room: PropTypes.string.isRequired,
// };
