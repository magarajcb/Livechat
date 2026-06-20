const http=require('http')
const app=require("./app")

const { initSocket } = require("./sockets/socket");
const dotenv=require("dotenv")
dotenv.config();
const connnectDB=require("./config/db")
connnectDB();

const server=http.createServer(app)

initSocket(server);
server.listen(process.env.PORT,()=>{
    console.log(`Server running at 3001 ${process.env.PORT}`)
})