const express=require("express")
const router=express.Router()
const protect = require("../middleware/authMiddleware");
const { searchUsers, getUsers } = require("../controllers/userController");
router.get("/",protect,getUsers)
router.get("/search",protect,searchUsers)
module.exports=router;