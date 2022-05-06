const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const Msg = require('./Models/Message.model');

require('dotenv').config();
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// -----------  Chat start -----------------
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
// -----------  Chat end -----------------


// for TPC servers
server.listen(3001, ()=>{
    console.log("Started api server on 3001");
})

// Initialize DB
require('./initDB')();

app.get('/', (req, res, next)=>{
    res.json({message: 'It works...', env_name: process.env.DB_USER})
})
