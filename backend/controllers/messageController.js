const Conversation = require("../models/Conversation");
const Message=require("../models/Message")
    const { onlineUsers, getIO } = require("../sockets/socket");
const sendMessage= async(req,res)=>{
    try{
        const{conversationId,receiverId,content}=req.body;
        console.log("BODY:", req.body);
// console.log("conversationId:", conversationId);
// console.log("receiverId:", receiverId);
        const message=await Message.create({
            sender:req.userId,
            receiver:receiverId,
            conversation:conversationId,
            content,
        })
        
        await Conversation.findByIdAndUpdate(conversationId,
            {
                lastMessage:message._id
            }
        );
        const receiverSocketId=onlineUsers[receiverId]
        console.log("Receiver Socket:", receiverSocketId);
        if(receiverSocketId){
            getIo()
            .to(receiverSocketId)
            .emit("newmessage",message)
        }
        res.status(201).json(message)
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const getMessage=async(req,res)=>{
    try{
        console.log("PARAMS:", req.params);
console.log("conversationId:", req.params.conversationId);
        const messages= await Message.find({
            conversation:req.params.conversationId
        })
        .populate("sender","name email")
        .sort({createdAt:1})
        res.status(200).json(messages)
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports={sendMessage,getMessage}