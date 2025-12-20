// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import authRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js";
// import postRouter from "./routes/post.routes.js";
// import loopRouter from "./routes/loop.routes.js";
// import messageRouter from "./routes/message.routes.js";
// import { app, server } from "./socket.js";
// dotenv.config();


// const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin:"*",
//      //frontend url]
//     credentials: true, //
//   })
// );
// app.use(express.json()); //it will tell the routes that what every data is coming from frontend is in json format so that we will not  get the error of undefined
// app.use(cookieParser()); //

// app.use("/api/auth", authRouter); //it will add the api/auth in front of all routes that we have created from authRouter
// app.use("/api/user", userRouter);
// app.use("/api/post", postRouter);
// app.use("/api/loop", loopRouter);
// app.use("/api/message",messageRouter)
// app.get("/",(req,res)=>{
//   res.send("Backend is running")
// });

// server.listen(port, () => {
//   connectDb();
//   console.log("Server is started");
// });
// //PAkoQtwxDjvJy8La










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

/* =========================
   CORS CONFIGURATION
========================= */
app.use(
  cors({
    origin: true, // frontend domain
    credentials: true,
  })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(cookieParser());

/* =========================
   HEALTH CHECK (IMPORTANT)
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "loopin-backend",
    timestamp: new Date(),
  });
});

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/loop", loopRouter);
app.use("/api/message", messageRouter);

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* =========================
   SERVER START
========================= */
server.listen(port, "0.0.0.0", () => {
  connectDb();
  console.log(`Server running on port ${port}`);
});
