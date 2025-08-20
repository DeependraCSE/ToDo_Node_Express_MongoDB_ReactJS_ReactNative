import {TASK, TASKLIST} from "../helper/model.js"
import {customConsole} from '../helper/helperFunction.js'
import { CommonResponse } from "../helper/responseConstant.js"

// test tsak api
export const testTaskController = (req, res)=>{
    customConsole("testTaskController called")
    res.send("Task controller is working fine")
}

/// create update task list
export const createUpdateTaskList = async (req, res) =>{
    customConsole("createUpdateTaskList")
    let input, dbres, display_message;
    try{
        if(req.body.id != 0){
            input = {
                title : req.body.title,
                description : req.body.description,
                last_modify : new Date()
            }
            dbres = await TASKLIST.findByIdAndUpdate({_id : req.body.id}, input, {new:true})
            display_message = "Task list edited successfully."
        }else{
            input = {
                title : req.body.title,
                description : req.body.description,
                created_at : new Date(),
                last_modify : new Date(),
                user_refrence_id : req.user.id
            }
            dbres = await TASKLIST(input).save()
            display_message = "Task list created successfully."
        }

        dbres = await TASKLIST.findOne({_id : dbres._id})
        // customConsole("createEditTask", "dbres",dbres)

        if(dbres){
            const data = [{
                "title": dbres.title,
                "description": dbres.description,
                "created_at": dbres.created_at,
                "last_modify": dbres.last_modify,
                "id": dbres._id
            }]
            return CommonResponse.success(res, display_message, data)
        }

    }catch(error){
        customConsole("createUpdateTaskList error", error)
        return CommonResponse.error(res, error)
    }
}

/// get all task list
export const getAllTaskList = async (req, res) =>{
    customConsole("getAllTaskList")
    let items = [];
    let display_message;
    try{
        const data = await TASKLIST.find({user_refrence_id : req.user.id})
        if(data && data.length > 0){
            items = data.map((item)=>{
                    return(
                        {
                            "title": item.title,
                            "description": item.description,
                            "created_at": item.created_at,
                            "last_modify": item.last_modify,
                            "id": item._id
                        }
                    )
                })
                display_message = "All task list fetched successfully."
                
        }else{
            display_message = "No task list found."
        }
        return CommonResponse.success(res, display_message, items)
    }catch(error){
        customConsole("getAllTaskList error", error)
        return CommonResponse.error(res, error)
    }    
}

/// create update task
export const createUpdateTask = async (req, res) =>{
    customConsole("createUpdateTask")
    let input, dbres, display_message;
    try{
        if(req.body.id != 0){
            input = {
                task_title : req.body.task_title,
                last_modify : new Date()
            }
            dbres = await TASK.findByIdAndUpdate({_id : req.body.id}, input, {new : true})
            display_message = "Task edited successfully."
        }else{
            input = {
                task_title : req.body.task_title,
                is_completed : false,
                created_at : new Date(),
                last_modify : new Date(),
                task_list_refrence_id : req.body.task_list_refrence_id
            }
            dbres = await TASK(input).save()
            display_message = "Task created successfully."
        }

        dbres = await TASK.findOne({_id : dbres._id})
        const items=[{
            "task_title": dbres.task_title,
            "is_completed": dbres.is_completed,
            "created_at": dbres.created_at,
            "last_modify": dbres.last_modify,
            "task_list_refrence_id": dbres.task_list_refrence_id,
            "id": dbres._id
        }]
        return CommonResponse.success(res, display_message, items)
    }catch(error){
        customConsole("createUpdateTask error", error)
        return CommonResponse.error(res, error)
    }
}

/// get all task
export const getAllTaskByLastList = async (req, res) =>{
    customConsole("getAllTask")
    let display_message;
    let items = [];
    try{
    const data = await TASK.find({task_list_refrence_id : req.params.task_list_refrence_id})
        if(data && data.length > 0){
            display_message = "All task fetched successfully.",
            items = data.map((item)=>{
                return(
                    {
                        "task_title": item.task_title,
                        "is_completed": item.is_completed,
                        "created_at": item.created_at,
                        "last_modify": item.last_modify,
                        "task_list_refrence_id": item.task_list_refrence_id,
                        "id": item._id
                    }
                )
            })
        }else{
            display_message = "No task found"
        }
        return CommonResponse.success(res, display_message, items)
    }catch(error){
        customConsole("getAllTask", error)
        return CommonResponse.error(res, error)
    }
}

/// get single task based on id
export const getTask = async (req, res) =>{
    customConsole("getTask")
    let display_message;
    let items = [];
    try{
        const item = await TASK.findOne({_id : req.params.id})
        if(item){
            display_message = "Task fetched successfully."
            items = [{
                "task_title": item.task_title,
                "is_completed": item.is_completed,
                "created_at": item.created_at,
                "last_modify": item.last_modify,
                "task_list_refrence_id": item.task_list_refrence_id,
                "id": item._id
            }]            
        }else{
            display_message = "Invalid task."
        }
        return CommonResponse.success(res, display_message, items)
    }catch(error){
        customConsole("getTask error", error)
        return CommonResponse.error(res, error)
    }
}

/// delete task by id
export const deleteTaskById = async(req, res) => {
    customConsole("deleteTask")
    try{
        const deletedTask = await TASK.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            customConsole("deleteTask record not found")
            return CommonResponse.fail(res, "Record not found.")
        }else{
            customConsole("deleteTask record deleted")
            return CommonResponse.success(res, "Record deleted successfully.")
        }  
    }catch(error){
        customConsole("deleteTask error", error)
        return CommonResponse.error(res, error)
    }
}

/// delete task list by id
export const deleteTaskListById = async(req, res) => {
    customConsole("deleteTaskList")
    const id = req.params.id;
    // production
    /** 
     * const session = await mongoose.startSession();
    try{
        session.startTransaction();

        const deletedTaskList = await TASKLIST.findByIdAndDelete(id,{ session });
        if (!deletedTaskList) {
            throw new Error("Task not found or reference mismatch");
        }
        customConsole("deleteTask record deleted")

        const listData = await TASK.find({task_list_refrence_id : id})
        if(listData && listData.length > 0){
            await TASK.deleteMany({task_list_refrence_id : id},{ session })
            customConsole("all task deleted from task list")
        }

        await session.commitTransaction();
        session.endSession();
        
        res.send({
            "message_type" : message_type_success, "message" : message_success ,
            "display_message" : "Record deleted successfully."
        })  
    }catch(error){
        customConsole("deleteTask error", error) 
        await session.abortTransaction();
        session.endSession();
        res.send({
            "message_type" : message_type_fail, "message" : message_fail ,
            "display_message":`Some error occered, try after sometime. ${error} `
        })
    }*/

    // development
    try{
        const deletedTaskList = await TASKLIST.findByIdAndDelete(id);
        if (!deletedTaskList) {
            return CommonResponse.fail(res, "Record not found.")
        }else{
            customConsole("deleteTaskList record deleted")
            const listData = await TASK.find({task_list_refrence_id : id})
            if(listData && listData.length > 0){
                await TASK.deleteMany({task_list_refrence_id : id})
                customConsole("all task deleted from task list")
            }
            return CommonResponse.success(res, "Record deleted successfully.")
        }         
    }catch(error){
        customConsole("deleteTaskList error", error) 
        return CommonResponse.error(res, error)
    }
}

// update task status
export const updateTaskStatus = async(req, res) => {
    customConsole("updateTaskStatus")
    const id = req.params.id;
    const is_completed = req.body.is_completed
    try{
        const task = await TASK.findById(id);
        if (!task) {
            return CommonResponse.fail(res,"Record not found.")
        }else{
            customConsole("updateTaskStatus record found")
            task.is_completed = is_completed
            await task.save()
            const items = [{
                "task_title": task.task_title,
                "is_completed": task.is_completed,
                "created_at": task.created_at,
                "last_modify": task.last_modify,
                "task_list_refrence_id": task.task_list_refrence_id,
                "id": task._id
            }]
            return CommonResponse.success(res, "Task updated successfully.",items)
        }         
    }catch(error){
        customConsole("updateTaskStatus error", error) 
        return CommonResponse.error(res, error)
    }
}