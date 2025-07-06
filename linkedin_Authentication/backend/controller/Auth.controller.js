import dotenv from "dotenv";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
dotenv.config();
const getAccessToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    redirect_uri: "http://localhost:5000/api/linkedin/callback",
    scope: "openid email profile",
  });
  const respone = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!respone.ok) {
    throw new Error(respone.statusText);
  }
  const accessToken = await respone.json();
  return accessToken;
};

const getUserdata = async (accessToken) => {
  const respone = await fetch("https://api.linkedin.com/v2/userinfo", {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!respone.ok) {
    throw new Error(respone.statusText);
  }

  const userData = await respone.json();
  return userData;
};

export const LInkedinCallBAck = async (req, res) => {
  try {
    const { code } = req.query;
    // Get Access Token
    const accessToken = await getAccessToken(code);

    // Get User Data using access Token
    const userData = await getUserdata(accessToken.access_token);

    if (!userData) {
      return res.status(500).json({
        success: false,
        error,
      });
    }
    // Chevk if user already register
    let user;
    user = await User.findOne({ email: userData.email });
    if (!user) {
      user = new User({
        name: userData.name,
        email: userData.email,
        phone: userData?.phone,
        avatar: userData?.picture,
      });
    }
    await user.save();

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.redirect("http://localhost:5173/profile");
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const GetUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
