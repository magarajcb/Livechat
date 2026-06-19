const http=require('http')
const app=require("./app")
const {Server}=require("socket.io")
const socketHandler=require("./sockets/socket")
const dotenv=require("dotenv")
dotenv.config();
const connnectDB=require("./config/db")
connnectDB();

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*"
    }
})
socketHandler(io)
server.listen(process.env.PORT,()=>{
    console.log(`Server running at 3001 ${process.env.PORT}`)
})