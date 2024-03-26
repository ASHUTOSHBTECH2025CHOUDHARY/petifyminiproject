import express from "express"
import  Jwt  from "jsonwebtoken"

const verifytoken=async(req,res,next)=>{
    try {
    let token=req.cookies.token
    if(!token){
        console.log(token)
        console.log("User nhi hai vo")
       return  res.send(500).json({success:false})
    }
    let verify=Jwt.verify(token,"adhewegfrithregrigheofeiofneojeokgroegh")
    // console.log(verify)
    console.log("verify ho gaya")
    next();
   } catch (error) {
    // res.send(500).json({success:false})
    console.log((err)=>console.log("token ka error"));
   }
}

export default verifytoken