const socketIO = require("socket.io");

let io;
const onlineUsers = {};

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("typing", ({ receiverId }) => {
  const receiverSocketId =
    onlineUsers[receiverId];

  if (receiverSocketId) {
    io.to(receiverSocketId).emit(
      "userTyping"
    );
  }
});

//   socket.on("join", (userId) => {
//   console.log("JOIN EVENT:", userId);

//   onlineUsers[userId] = socket.id;

//   console.log("ONLINE USERS:", onlineUsers);

//   io.emit("onlineUsers", Object.keys(onlineUsers));
// });
socket.on("join", (userId) => {
  console.log("JOIN EVENT:", userId);

  onlineUsers[userId] = socket.id;

  console.log("ONLINE USERS:", onlineUsers);
});

    socket.on("disconnect", () => {
      Object.keys(onlineUsers).forEach((userId) => {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
        }
      });

      io.emit("onlineUsers", Object.keys(onlineUsers));

      console.log("User disconnected:", socket.id);
    });
  });
};

const getIO = () => io;

module.exports = {
  initSocket,
  getIO,
  onlineUsers,
};