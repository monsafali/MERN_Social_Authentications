import express from "express";
import { getUser, Login } from "../controller/Auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", Login);
authRoute.get("/getuser", getUser);

export default authRoute;
