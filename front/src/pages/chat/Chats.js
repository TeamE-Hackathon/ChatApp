import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Chat.css';
import ScrollToButtom from 'react-scroll-to-bottom';
import { SendMessageButton } from '../../components/button/SendMessageButton';

export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setcurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),

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
                {/* TODO: Room名表示する？*/}
                <p>Room : </p>
            </div>
            <div className='chat-body'>
                <ScrollToButtom className='message-container'>
                    {messageList.map((messageContent, index) => {
                        console.log('mesageContent', messageContent);
                        return (
                            <div
                                key={index}
                                className='message'
                                id={username === messageContent.author ? 'you' : 'other'}
                            >
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='time'>{messageContent.time}</p>
                                        <p id='author'>{messageContent.author}</p>
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

Chat.propTypes = {
    socket: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
};