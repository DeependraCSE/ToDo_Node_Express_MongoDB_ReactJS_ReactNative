import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { CommonResponse } from "../helper/responseConstant.js";

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

//Generate OTP
export const generateOTP = ()=> {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Verify token
export const verifyToken = (req, res, next) => {
  customConsole("verifyToken")
  const authHeader = req.headers['authorization'];

  // customConsole("authHeader",authHeader)
  if (!authHeader){
    return CommonResponse.fail(res, "Missing token")
  }

  const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    customConsole("verifyToken verified")
    next();
  } catch (error) {
    customConsole("verifyToken not varified. Invalid or expired token")
    return CommonResponse.error(res,`Invalid or expired token ${error}`)
    // res.status(403).json({ message: 'Invalid or expired token' });
  }
};

//detect language
export const detectLanguagePlatform = (req, res, next) => {
  const lang = req.headers["accept-language"] || "en"; 
  // console.log("req.headers[accept-language]:", req.headers["accept-language"]);

  const platform = req.headers["platform"] || "unknown"; 
  // console.log("req.headers[platform]:", req.headers["platform"]);

  // You can store it in request object
  req.language = lang;
  req.platform = platform;
  next();
};

export const customConsole = (...args) => {
  console.log(args);
}