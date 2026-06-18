const express=require("express");
const protect = require("../middleware/authMiddleware");
const { sendMessage, getMessage } = require("../controllers/messageController");
const router=express.Router();
router.post("/",protect,sendMessage)
router.get("/:conversationId",protect,getMessage)


module.exports=router;