import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateJWTToken} from "../lib/utils.lib.js"

export const signup = async (req, res) => {
    const {fullName,email,password}= req.body
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All the filed are essentials"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user = await User.findOne({email});

        if (user) return res.status(400).json({message:"Email already exists"});


        const hashSalt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password,hashSalt);

        const newUser = new User({
            fullName:fullName,
            email:email,
            password: passwordHash
        });

        if (newUser){
            generateJWTToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }
        else{
            return res.status(400).json({message:"Invalid user data provided!"});
        }
    } catch (error) {
        console.log("Error in sign up controller"+ error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req, res) => {
    const {email,password}= req.body
    try {
        const user = await User.findOne({email});
        if(!user){
            
            return res.status(404).json({message :"Invalid credentials!"});
        }

        const isPasswordTrue = await bcrypt.compare(password,user.password);

        if(!isPasswordTrue){
            return res.status(404).json({message :"Invalid credentials!"});
        }
        generateJWTToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in the login controller: "+error)
        res.status(500).json({message: "Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwtToken","",{maxAge:0});
        res.status(200).json({message:"logged out successfully!"});
    } catch (error) {
        console.log("Error in the logout controller: "+error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfilePic = async (req, res)=>{
    try {
        const {profilePic} = req.body;
        req.user._id
    } catch (error) {
        
    }
};