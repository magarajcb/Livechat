const onlineUsers = {}
let ioInstance;

const socketHandler = (io) => {
    ioInstance=io

    io.on("connection", (socket) => {

        console.log("User Connected", socket.id);

        socket.on("join", (userId) => {

            onlineUsers[userId] = socket.id;

            console.log("Online Users:", onlineUsers);

        });

        socket.on("disconnect", () => {
            for(const userId in onlineUsers){
                if(onlineUsers[userId]===socket.id){
                    delete onlineUsers[userId]
                    break;
                }
            }
  console.log("Online Users:", onlineUsers);
            console.log("User Disconnected", socket.id);

        });

    });

    console.log("Socket Server Ready");
}
const getIO = () => ioInstance;
module.exports = socketHandler;
module.exports.onlineUsers = onlineUsers;
module.exports.getIO = getIO;