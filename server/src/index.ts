import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Disconnected ${socket.id}`);
  });

  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("messageReturn", message);
  });
});

server.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
