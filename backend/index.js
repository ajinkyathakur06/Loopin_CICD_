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

const PORT = process.env.PORT || 5002;

/* =========================
   TRUST PROXY (IMPORTANT)
   REQUIRED FOR HTTPS + INGRESS
========================= */
app.set("trust proxy", 1);

/* =========================
   CORS CONFIGURATION
========================= */
app.use(
  cors({
    origin: "https://loopin.imcc.com", // ✅ frontend domain (HTTPS)
    credentials: true,                // ✅ allow cookies
  })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(cookieParser());

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "loopin-backend",
    port: PORT,
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
  res.send("Loopin backend is running 🚀");
});

/* =========================
   SERVER START
========================= */
server.listen(PORT, "0.0.0.0", async () => {
  await connectDb();
  console.log(`🚀 Server running on port ${PORT}`);
});
