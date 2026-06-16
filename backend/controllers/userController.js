const User = require("../models/User");

const searchUsers=async(req,res)=>{
    try{
        const keyword=req.query.keyword
        ?
        {
            name:{
                $regex:req.query.keyword,
                $options:"i",
            },
        }:{};
        const users=await User.find(keyword).select("-password");
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports={searchUsers}