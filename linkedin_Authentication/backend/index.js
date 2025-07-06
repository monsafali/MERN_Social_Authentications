import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import AuthRoutes from "./route/auth.route.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/linkedin", AuthRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Data base connected successfuly");
  })
  .catch((err) => {
    console.log("Data base connectin failed");
  });

app.listen(PORT, () => {
  console.log("Server is ruing on port ", PORT);
});
