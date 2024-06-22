import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import Company from "../models/company.model.js"
import Doctor from "../models/doctor.model.js"

const isAuth = async (req,res,next)=>{
    try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"Unauthorized : No token"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({error:"Unauthorized : Invalid Token"})
    }
    const company = await Company.findById(decoded.Id).select("-password");
    const user = await User.findById(decoded.Id).select("-password");
    const doctor = await Doctor.findById(decoded.Id).select("-password");
    if(!company&&!user&&!doctor){
        return res.status(401).json({error:"Unauthorized : User not found"})
    }
   
   if(company) req.company = company;
   if(user) req.user = user;
   if(doctor) req.doctor = doctor;
    next();
    }
    catch(error){
        console.log("error in isAuth middleware", error.message);
        res.status(500).json("Internal Server Error");
    }
}

export default isAuth;