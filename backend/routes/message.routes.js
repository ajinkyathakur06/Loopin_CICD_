import express from "express";
import isAuth from "../middlewares/isAuth.js";
import  {upload}  from "../middlewares/multer.js";
import { getAllMessages, getPrevUserChats, sendMessage } from "../controllers/message.controllers.js";


const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", isAuth, upload.single('image'), sendMessage); //fetching the current loginuser by get method
messageRouter.get("/getAll/:receiverId", isAuth, getAllMessages);
messageRouter.get("/prevChats", isAuth, getPrevUserChats);

export default messageRouter;
