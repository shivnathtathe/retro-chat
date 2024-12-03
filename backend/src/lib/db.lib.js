import mongoose from "mongoose" ;


export const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log(`MongoDB connected Successfully!`);
} catch(error) {
    console.error(`MongoDB connection error: ${error}`);
}
};