import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile,follow,getCurrentUser,getProfile,suggestedUsers,followingList } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js"; 


const userRouter = express.Router();
userRouter.get("/current",isAuth,getCurrentUser)//fetching the current loginuser by get method
userRouter.get("/suggested",isAuth,suggestedUsers)
userRouter.get("/follow/:targetUserId",isAuth,follow)
userRouter.get("/followingList",isAuth,followingList)
userRouter.post("/editProfile",isAuth,upload.single("profileImage"),editProfile)
userRouter.get("/getProfile/:userName",isAuth,getProfile)

export default userRouter;
