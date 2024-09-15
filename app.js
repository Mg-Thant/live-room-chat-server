const express = require("express");
const socket = require("socket.io");
const cors = require("cors");

const formatMSG = require("./utils/formatMSG");

const app = express();

app.use(cors());

const server = app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

const io = socket(server, {
  cors: "*",
});

// Run when client-server connected
io.on("connection", (socket) => {
  console.log("Client has connected!!");
  const BOT = "Room Manager Bot";
  // send joined message all user
  socket.emit("message", formatMSG(BOT, "Welcome to my world"));
  // send joined message all user except user owner
  socket.broadcast.emit(
    "message",
    formatMSG(BOT, "Anonymous user has joined room...")
  );
  socket.on("disconnect", () => {
    io.emit("message", formatMSG(BOT, "Anonymous user has left the room..."))
  })
});
