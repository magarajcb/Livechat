    const express =require("express")
    const {registerUser, loginUser, getMe}=require("../controllers/authControllers");
const protect = require("../middleware/authMiddleware");
const { searchUsers } = require("../controllers/userController");
    const router=express.Router();
    router.post("/register",registerUser)
    router.post("/login",loginUser)
    router.get("/me",protect,getMe)
    router.get("/search",protect,searchUsers)
    module.exports=router;
