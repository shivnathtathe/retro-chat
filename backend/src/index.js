
import express from "express"
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./lib/db.lib.js"
import cookieParser from "cookie-parser"


const app = express();

dotenv.config()
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    console.log("Server is running on port : " + PORT);
    connectDB();
})