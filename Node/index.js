import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import dotenvExpand from "dotenv-expand";
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { CommonResponse } from "./helper/responseConstant.js"
import { detectLanguagePlatform} from './helper/helperFunction.js';
const env = dotenv.config();
dotenvExpand.expand(env);
const host = process.env.HOST
const port = process.env.PORT
const mongoose_db_url = process.env.MONGOOSE_DB_URL
// console.log("host", host,"port", port,"mongoose_db_url", mongoose_db_url, )
const app = express()
mongoose.connect(mongoose_db_url).then(()=>{
    console.log("Mongodb connected")
}).catch((error)=>{
    console.log("Error at mongodb", error)
})

app.use(express.json())
app.use(cors())
app.use(express.urlencoded());

app.use('/api/users/',detectLanguagePlatform, userRoutes)
app.use('/api/tasks/',detectLanguagePlatform, taskRoutes)

app.get("/", (req,res)=>{
    res.status(200);
    //res.send("Welcome to our server")
    return CommonResponse.fail(res, "Welcome to our server")
})

app.listen(port,host,(error)=>{
    if(error){console.log("Error", error)}
    else{console.log(`Server running at ${host}:${port}`)}
})