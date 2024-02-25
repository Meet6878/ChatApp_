const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const DBconnect = require("./DBConn/DBcon");
const route = require("./Routes/UserRoute");
const massageroute = require("./Routes/MassageRoute");
const socket = require("socket.io");
const path = require("path");

const app = express();

dotenv.config();

DBconnect();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", route);
app.use("/api/massage", massageroute);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("listening on port 8000 ");
});

const io = socket(server, {
  cors: {
    origin: `https://chatapp-d1jz.onrender.com/`,
    credentials: true,
  },
});

//============================= for live api check===============================

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//============================= for live api check===============================

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.massage);
    }
  });
});
