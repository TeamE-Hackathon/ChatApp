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
const app = express();

const allowedOrigins = 'http://localhost:3000';
const options = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

// open websocket on 3000
const server = http.createServer(app);
const io = new Server(server, {
  // TODO: もしかしたらこのCORSの設定いらないかも
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const roomRouter = require('./routes/room');
app.use('/rooms', roomRouter)

// for TPC servers
server.listen(3001, () => {
  console.log('Started api server on 3001');
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} join_room: ${data}`);
  });

  socket.on('send_message', async (data) => {
    console.log('send_message', data);
    const params = {
      TableName: 'chat',
      Item: {
        name: data.author,
        time: nowTime(),
        chat_room: data.room,
        message: data.message,
      },
    };
    try {
      const data = await ddbDocClient.send(new PutCommand(params));
      console.log('Success - item added or updated', data);
      return data;
    } catch (err) {
      console.log('Error', err);
    }
  });
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});
