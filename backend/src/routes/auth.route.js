import express from "express"
import { login, logout, signup,updateProfilePic } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("update-profile-pic",protectRoute, updateProfilePic) //protectRoute is the middleware


export default router;
