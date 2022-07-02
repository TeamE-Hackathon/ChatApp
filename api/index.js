const express = require('express');
const http = require('http');

// for establish connection to client
const cors = require('cors');
const { Server } = require('socket.io');

// for saving to dynamoDB
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { ddbDocClient } = require('./initDB');
const { nowTime } = require('./utils/dateTime');

require('dotenv').config();
const FRONT_ENDPOINT = process.env.FRONT_ENDPOINT;
const app = express();

const allowedOrigins = `${FRONT_ENDPOINT}:3000`;
const options = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

// open websocket on 3000
const server = http.createServer(app);
const io = new Server(server, {
  // TODO: もしかしたらこのCORSの設定いらないかも
  cors: {
    origin: `${FRONT_ENDPOINT}:3000`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const roomRouter = require('./routes/room');
app.use('/rooms', roomRouter);

const userRouter = require('./routes/user');
app.use('/users', userRouter);

const chatsRouter = require('./routes/chats');
app.use('/chats', chatsRouter);

// for TPC servers
server.listen(3001, () => {
  console.log('Started api server on 3001');
});

// const { postNewChat } = require('./Controllers/chats');

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} join_room: ${data}`);
  });

  socket.on('send_message', async (data) => {
    console.log('send_message', data);
    const params = {
      TableName: 'chats',
      Item: {
        UserName: data.userName,
        // time: nowTime(),
        CreatedAt: data.createdAt,
        RoomName: data.roomName,
        Message: data.message,
      },
    };
    try {
      const result = await ddbDocClient.send(new PutCommand(params));
      console.log('Success - item added or updated', result);
      console.log('broadcast_data: ', data);
      socket.to(data.roomName).emit('receive_message', data);
    } catch (err) {
      console.log('Error', err);
    }
    // const { error } = postNewChat(data);
    // error || socket.to(data.roomName).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});
