import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import loopRouter from "./routes/loop.routes.js";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket.js";
dotenv.config();


const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
     //frontend url
    credentials: true, //
  })
);
app.use(express.json()); //it will tell the routes that what every data is coming from frontend is in json format so that we will not  get the error of undefined
app.use(cookieParser()); //

app.use("/api/auth", authRouter); //it will add the api/auth in front of all routes that we have created from authRouter
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/loop", loopRouter);
app.use("/api/message",messageRouter)


server.listen(port, () => {
  connectDb();
  console.log("Server is started");
});
//PAkoQtwxDjvJy8La
