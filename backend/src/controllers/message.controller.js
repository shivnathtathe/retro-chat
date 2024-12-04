import cloudinary from "../lib/cloudinary.libs.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req,res)=>{
    try {
        const loggedInUserId = await req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in the messageController/getAllUsers controller: "+error)
        res.status(500).json({message: "Internal server error"});
    }
};

export const getMessages = async(req,res) =>{
    try {
        const { id:userToChatWithId } = req.params;
        const messageSenderId = req.user._id;
        const messages =  await Message.find({
            $or:[
                {
                    senderId:messageSenderId,
                    receiverId: userToChatWithId
                },
                {
                    senderId: userToChatWithId,
                    receiverId: messageSenderId
                }
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in the messageController/getMessages controller: "+error)
        res.status(500).json({message: "Internal server error"});
    }
};

export const sendMessage = async (req,res) =>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        let imgUrl;
        if(image){
            const uploadResult = await cloudinary.uploader.upload(image);
            imgUrl = uploadResult.secure_url;
        }

        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image:imgUrl
        });

        await newMessage.save();

        //real time functionality using socket.io
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in the messageController/sendMessage controller: "+error)
        res.status(500).json({message: "Internal server error"});
    }
};