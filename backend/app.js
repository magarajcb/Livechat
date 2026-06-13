const express=require("express")
const app=express();
app.get("/",(req,res)=>{
    res.send("Live chat app backend running")
})
module.exports=app