require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation");
const createUsers = require("./seeds");

// initialize app
const app = express();
app.use(cors());

// middleware functions
app.use(express.json());

// routes
app.use("/user", userRoutes);
app.use("/conversation", conversationRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Succesfully connected to MongodB Atlas and listening on PORT ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(err));

// createUsers();
