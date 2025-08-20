import express from 'express'
const router = express.Router()

import { testUserController, registerUser, resendOTP, varifyOTP, login, changePwdByMblNo, 
    changePassword, deleteProfile } from '../controllers/userController.js'

import {verifyToken} from "../helper/helperFunction.js"

router.get("/testUserController", testUserController)
router.post("/registerUser", registerUser)
router.post("/resendOTP", resendOTP)
router.post("/varifyOTP", varifyOTP)
router.post("/login", login)
router.post("/changePwdByMblNo", changePwdByMblNo)
router.post("/changePassword", verifyToken, changePassword)
router.delete("/deleteProfile", verifyToken, deleteProfile)

export default router