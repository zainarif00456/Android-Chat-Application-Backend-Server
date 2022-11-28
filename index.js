// Essential Imports for server side of the project
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors')

app.use(cors());

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

server.listen(3002, ()=>{
    console.log("SERVER IS UP AND RUNNING")
})

io.on("connection", (socket)=>{
    console.log("User Connected with ID: " +socket.id)

    socket.on("send_msg", (data)=>{
        console.log(data.message)
        socket.broadcast.emit("receive_msg", data)
    })
})


