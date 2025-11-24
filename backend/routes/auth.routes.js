
import express from "express"
import { signIn, signOut, signUp,sendOtp,verifyOtp,resetPassword} from "../controllers/auth.controllers.js"


const authRouter=express.Router()
authRouter.post("/signup",signUp)//using post method because we are taking something from req.body
authRouter.post("/signin",signIn)
authRouter.get("/signout", signOut); 
authRouter.post("/sendOtp", sendOtp); 
authRouter.post("/verifyOtp", verifyOtp); 
authRouter.post("/resetPassword", resetPassword); 

export default authRouter