// import {V2 as cloudinary} from "cloudinary"
import cloudinary from "cloudinary";
import {config} from "dotenv"

config()
const { v2: cloudinaryV2 } = cloudinary;
cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;