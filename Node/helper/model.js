import mongoose from "mongoose";
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

//Create user model
export const USER = mongoose.model("users", new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    mobile_no : {type : Number, require : true, unique : true},
    otp : Number,
    password : String,
    token : String,
    is_mobile_no_varified : Boolean
}))

//Create task list model
export const TASKLIST = mongoose.model("tasklists", new Schema({
    id : ObjectId,
    title : String,
    description : String,
    created_at : Date,
    last_modify : Date,
    user_refrence_id : String
}))


//Create task model
export const TASK = mongoose.model("tasks", new Schema({
    id : ObjectId,
    task_title : String,
    is_completed : Boolean,
    created_at : Date,
    last_modify : Date,
    task_list_refrence_id : String
}))
