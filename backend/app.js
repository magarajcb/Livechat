const express=require("express")
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const conversatioRoutes=require("./routes/conversationRoutes")
const messageRoutes=require("./routes/messageRoutes")
const app=express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Live chat app backend running")
})
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/conversation",conversatioRoutes)
app.use("/api/messages",messageRoutes)
module.exports=app