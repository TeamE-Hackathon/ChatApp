const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const Msg = require('./Models/Message.model');

require('dotenv').config();
const app = express();

// open websocket on 3000
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

io.on("connection", (socket)=> {
    console.log("User connected", socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user with ID: ${socket.id} join_room: ${data}`);
    });

    // save to mongoDB
    socket.on('send_message', (data) => {
        console.log("send_message", data);
        const msg = new Msg({
            room: data.room,
            author: data.author,
            message: data.message,
        });
        msg.save().then(()=>{
            socket.to(data.room).emit("receive_message", data)
        })
    });
    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id);
    });
})

// for TPC servers
server.listen(3001, ()=>{
    console.log("Started api server on 3001");
})

// Initialize DB
require('./initDB')();