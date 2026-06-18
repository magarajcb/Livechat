const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    // console.log("Logged In User:", req.userId);
    // console.log("Receiver:", receiverId);

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [req.userId, receiverId],
      },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const conversation = await Conversation.create({
      participants: [req.userId,receiverId]
    });

    res.status(201).json(conversation);
  } 
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getConversation=async(req,res)=>{
    try{
      const conversation=await Conversation.find({
        participants:req.userId,
      })
      .populate("participants","name email")
      // .populate("lastMessage")
      res.status(200).json(conversation)
    }
    catch(error){
      res.status(500).json({
        message:error.message
      })
    }
  }
module.exports = {
  createConversation,getConversation
};