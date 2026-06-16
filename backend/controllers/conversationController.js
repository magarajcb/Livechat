const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;

    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [req.userId, receiverId],
      },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const conversation = await Conversation.create({
      participants: [req.userId, receiverId],
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createConversation,
};