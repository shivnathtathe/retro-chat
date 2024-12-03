import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
{
    email:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength:6,
    },
    profilePic:{
        type: String,
        default:"",
    }
} ,
{timestamps:true}
);

const User = mongoose.model("User",userSchema);
// mongoose.model("nameHere",schemaName); nameHere recommended to singular and Capital case. it will auto take is in plural and small case.
export default User;