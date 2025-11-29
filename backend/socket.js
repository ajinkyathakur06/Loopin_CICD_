import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {} // { userId: socketId }

export const getSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId
  if (userId!=undefined) {
    userSocketMap[userId] = socket.id;
    console.log(`${userId} connected with socket ${socket.id}`);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 📤 When user sends a message
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;
    const receiverSocketId = userSocketMap[receiverId];
    console.log("📨 Message received on server:", data);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage",{
        senderId,
        receiverId,
        message,}) 
    }
  });

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log(`${userId} disconnected`);
  });
});

export { app, io, server };





