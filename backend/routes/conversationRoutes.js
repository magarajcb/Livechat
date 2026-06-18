const express=require("express");
const protect = require("../middleware/authMiddleware");
const { createConversation, getConversation } = require("../controllers/conversationController");
const router=express.Router();
router.post("/",protect,createConversation)
router.get("/",protect,getConversation)
module.exports=router;