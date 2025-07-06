import express from "express";
import { GetUser, LInkedinCallBAck } from "../controller/Auth.controller.js";

const AuthRoutes = express.Router();

AuthRoutes.get("/callback", LInkedinCallBAck);
AuthRoutes.get("/getUser", GetUser);

export default AuthRoutes;
