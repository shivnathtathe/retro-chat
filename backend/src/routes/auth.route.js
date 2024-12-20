import express from "express"
import { checkUserAuth, login, logout, signup,updateProfilePic } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("update-profile-pic",protectRoute, updateProfilePic) //protectRoute is the middleware
router.get("/authenticate-user",protectRoute,checkUserAuth)

export default router;
