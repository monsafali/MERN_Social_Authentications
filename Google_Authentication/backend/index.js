import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import cors from "cors";
import authRoute from "./routers/auth.routes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Db Started successfuly");
  })
  .catch(() => {
    console.log("something went wrong while making connectin on mongodb");
  });
app.listen(PORT, () => {
  console.log("Server is runing on port", PORT);
});
