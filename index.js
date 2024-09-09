

const express = require("express");
const app = express();



const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.static('public'));
io.on("connection", (socket) => {
    socket.on("Send-location", (data) => {
        io.emit("recive-location", {
            id: socket.id,
            ...data,
        });
    });
    console.log("connected");
    socket.on("disconnect", (socket) => {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});