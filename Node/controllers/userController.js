import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { generateOTP, customConsole } from "../helper/helperFunction.js";
import { TASK, TASKLIST, USER } from "../helper/model.js";
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
import { CommonResponse } from "../helper/responseConstant.js";

//Test url
export const testUserController = (req, res)=>{
    customConsole("testUserController called")
    res.send("User controller working fine")
}

/// Register new user, update details if user registerd and mobile no not varified, 
/// suggest for forgot password if user already registered and mobile no varified.
export const registerUser = async (req, res)=>{
    customConsole("registerUser")
    try{
        const user = await USER.findOne({mobile_no : req.body.mobile_no})
        if(user){
            if(user.is_mobile_no_varified){
                customConsole("user exist, mobile no varified")
                return CommonResponse.fail(res, `User already exist with ${user.mobile_no}, please use forgot password for recover your account`)
            }else{
                customConsole("user exist, mobile no not varified")
                const dbres = await USER.findByIdAndUpdate({_id : user._id}, {
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    password : req.body.password,
                    otp : generateOTP()
                },{new:true})

                const items = [{"mobile_no" : dbres.mobile_no}]
                return CommonResponse.success(res, `OTP is send to your registered mobile no ${dbres.mobile_no}, please varify ${dbres.otp}`, items)
            }
        }else{
            customConsole("Users not exist")
            const dbres = await USER({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                password : req.body.password,
                mobile_no : req.body.mobile_no,
                otp : generateOTP(),
                token : "",
                is_mobile_no_varified : false
            }).save()
            const items = [{"mobile_no" : dbres.mobile_no}]
            return CommonResponse.success(res, `OTP is send to your registered mobile no ${dbres.mobile_no}, please varify ${dbres.otp}`, items)
        }
    }catch(error){
        customConsole("registerUser error", error)
        return CommonResponse.error(res, error)
    }
    
}

/// Resend OTP if user exist
export const resendOTP = async (req, res)=>{
    customConsole("resendOTP")
    try{
        const user = await USER.findOne({mobile_no : req.body.mobile_no})
        if(user){
            customConsole("resendOTP Users exist")
            return CommonResponse.success(res, `OTP is resend to your registered mobile no ${user.mobile_no}, please varify ${user.otp}`)
        }else{
            customConsole("resendOTP Users not exist")
            return CommonResponse.fail(res, `Mobile no ${req.body.mobile_no} is not exist in our database, please register first`)
        }
    }catch(error){
        customConsole("resendOTP error",error)
        return CommonResponse.error(res, error)
    }    
}

/// Verify OTP
export const varifyOTP = async (req, res)=>{
    customConsole("varifyOTP")
    const mobile_no = req.body.mobile_no
    const otp = req.body.otp
    try{
        const user = await USER.findOne({mobile_no : mobile_no})
        if(user){            
            if(user.otp == otp){
                customConsole("varifyOTP otp varified")
                await USER.findByIdAndUpdate({_id : user._id}, {is_mobile_no_varified : true},{new:true})
                return CommonResponse.success(res, `Your mobile no ${mobile_no} is varified succesfully.`)
            }else{
                customConsole("varifyOTP otp not varified")
                return CommonResponse.fail(res, `Invalid OTP, please varify again`)
            }
        }else{
            customConsole("varifyOTP user not exist")
            return CommonResponse.fail(res, `Mobile no ${mobile_no} does not exist please register first`)
        }
    }catch(error){
        customConsole("varifyOTP error", error)
        return CommonResponse.error(res, error)
    }    
}

///Login
export const login = async (req, res)=>{
    customConsole("login")
    const mobile_no = req.body.mobile_no
    try{
        const user = await USER.findOne({mobile_no : mobile_no})
        if(user){
            if(user.password == req.body.password){
                customConsole("login user exist, password match")
                // Generate token
                const token = jwt.sign({id : user._id, mobile_no : user.mobile_no}, JWT_SECRET, {/*expiresIn: JWT_EXPIRES_IN */ });
                const dbres = await USER.findByIdAndUpdate({_id : user._id},{token : token},{new:true})
                const items = [{
                    "firstname": dbres.firstname,
                    "lastname": dbres.lastname,
                    "mobile_no": dbres.mobile_no,
                    "is_mobile_no_varified": dbres.is_mobile_no_varified,
                    "token": token
                }]                
                return CommonResponse.success(res, "Login Successfully",items)            
            }else{
                customConsole("login user exist, password not match")
                return CommonResponse.fail(res, "Invalid password.")  
            }
        }else{
            customConsole("Users not exist")
            return CommonResponse.fail(res, `Mobile no ${mobile_no} does not exist please register first`)  
        }
    }catch(error){
        customConsole("login error", error)
        return CommonResponse.error(res, error)
    }
}

///Change password using mobile no, it will help at forgot password
export const changePwdByMblNo = async (req, res)=>{
    customConsole("changePwdByMblNo")
    const mobile_no = req.body.mobile_no;
    try{
        const user = await USER.findOne({mobile_no : mobile_no})
        if(user){
            customConsole("changePwdByMblNo user exist")            
            await USER.findByIdAndUpdate({_id : user._id},{password : req.body.password},{new:true})
            return CommonResponse.success(res, "Password updated successfully.")
        }else{
            customConsole("changePwdByMblNo Users not exist")
            return CommonResponse.fail(res, `Mobile no ${mobile_no} does not exist please register first`)
        }
    }catch(error){
        customConsole("changePwdByMblNo error",error)
        return CommonResponse.error(res, error)
    }    
}

///Change password 
export const changePassword = async (req, res)=>{
    customConsole("changePassword")
    try{
        const user = await USER.findOne({$and : [{_id : req.user.id} , {password : req.body.old_password}]})
        if(user){
            customConsole("changePassword user exist password match")            
            await USER.findByIdAndUpdate({_id : req.user.id},{password : req.body.new_password},{new:true})
            return CommonResponse.success(res, "Password updated successfully.")
        }else{
            customConsole("changePassword Users not exist")
            return CommonResponse.fail(res, "Old password does not match")
        }
    }catch(error){
        customConsole("changePassword error",error)
        return CommonResponse.error(res, error)
    }    
}

/// delete profile
export const deleteProfile = async(req, res) => {
    customConsole("deleteProfile")
    const userId = req.user.id
    try{
        // delete user
        const deletedUser = await USER.deleteOne({_id : userId})
        if(!deletedUser){
            customConsole("deleteProfile record not found")
            return CommonResponse.fail(res, "User not found.")
        }else{
            customConsole("deleteProfile record deleted")
            // find task list of user for find tasks
            const taskList = await TASKLIST.find({user_refrence_id : userId})
            const taskListIds = taskList.map((item)=>item._id)

            // find and delete tasks of all task list
            await TASK.deleteMany({task_list_refrence_id : {$in : taskListIds}})

            // delete all task list of user
            await TASKLIST.deleteMany({user_refrence_id : userId})
            return CommonResponse.success(res, "User deleted successfully.")
        }
    }catch(error){
        customConsole("deleteProfile error", error)
        return CommonResponse.error(res, error)
    }
}