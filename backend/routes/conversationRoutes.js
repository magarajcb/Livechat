const express=require("express");
const protect = require("../middleware/authMiddleware");
const { createConversation } = require("../controllers/conversationController");
const router=express.Router();
router.post("/",protect,createConversation)
module.exports=router;