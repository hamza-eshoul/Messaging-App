require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation");

// middleware functions
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// initialize app and socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});

// routes
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);

// socket.io logic
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ addedMessage, receiver, conversation }) => {
    const receiverId = receiver._id;
    const user = getUser(receiverId);

    if (user) {
      io.to(user.socketId).emit("getMessage", { addedMessage, conversation });
    }
  });

  // disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    server.listen(process.env.PORT, () => {
      console.log(
        `Succesfully connected to MongodB Atlas and listening on PORT ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
