import http from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  path:"/api/socket.io",
  cors: {
    origin: ["https://loopin.imcc.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // { userId: socketId }

export const getSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query?.userId;

  if (!userId) {
    console.log("Socket connected without userId");
    return;
  }

  userSocketMap[userId] = socket.id;
  console.log(`User ${userId} connected with socket ${socket.id}`);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;
    const receiverSocketId = userSocketMap[receiverId];

    console.log("📨 Message received:", data);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId,
        receiverId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    Object.keys(userSocketMap).forEach((key) => {
      if (userSocketMap[key] === socket.id) {
        delete userSocketMap[key];
      }
    });

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(`Socket ${socket.id} disconnected`);
  });
});

export { app, io, server };


