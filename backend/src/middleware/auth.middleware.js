import jwt from "jsonwebtoken"
import User from "../models/user.model.js";


export const protectRoute = async (req, res ,next)=>{
    //next will call the next fun that is in the route
    try {
        const token  =  req.cookie.jwtToken;
        if(!token){
            return res.status(401).json({message:"No token provided!"});
        }

        const jwtDecodedToken = jwt.verify(token,process.env.JWT_TOKEN_SECRET_KEY);

        if(!jwtDecodedToken){
            return res.status(401).json({message:"Token is invalid!"});
        }

        const currentUser = await User.findById(jwtDecodedToken.userId).select("-password");

        if(!currentUser){
            return res.status(404).json({message:"User not found"});
        }
        req.user = currentUser
        next()
    } catch (error) {
        console.log("Error in the auth middleware: "+error)
        res.status(500).json({message: "Internal server error"});
    }

};