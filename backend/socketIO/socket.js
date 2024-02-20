const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://172.17.135.11:3001"],
    methods: ["GET", "POST"]
  }
});

const socketAndUserMap = {};

const getSocketId = (userId) => {
  return socketAndUserMap[userId];
};

io.on("connection", (socket) => {
  if (socket.handshake.query.userId !== "undefined") {
    socketAndUserMap[socket.handshake.query.userId] = socket.id;
  }

  io.emit("onlineusers", Object.keys(socketAndUserMap));

  socket.on("typing", (id) => {
    io.to(socketAndUserMap[id]).emit("isTyping", true);
  });

  socket.on("disconnect", () => {
    delete socketAndUserMap[socket.handshake.query.userId];
    io.emit("onlineusers", Object.keys(socketAndUserMap));
  });
});

module.exports = {
  app,
  io,
  server,
  getSocketId
};
