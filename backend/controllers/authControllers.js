const User=require('../models/User')
const bcrypt=require("bcryptjs")

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const jwt=require("jsonwebtoken");
const user = require('../models/User');
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            Message:"Invalid User"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            Messsage:"Invalid User"
        })
    }
    const token=jwt.sign({id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
    res.status(200).json({
        Message:"Login Succesful",token,user
    })
    }
    catch(error){
        res.status(500).json({Mesage:error.message})
    }
}
const getMe=async (req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports={registerUser,loginUser,getMe}