import express from 'express'
const router = express.Router()

import {verifyToken} from "../helper/helperFunction.js"
import {testTaskController, createUpdateTaskList, getAllTaskList, createUpdateTask, 
    getAllTaskByLastList, getTask, deleteTaskById, deleteTaskListById, updateTaskStatus} from '../controllers/taskController.js'

router.get("/testTaskController",testTaskController)
router.post("/createUpdateTaskList",verifyToken,createUpdateTaskList)
router.get("/getAllTaskList",verifyToken,getAllTaskList)
router.post("/createUpdateTask",verifyToken,createUpdateTask)
router.get("/getAllTaskByLastList/:task_list_refrence_id",verifyToken,getAllTaskByLastList)
router.get("/getTask/:id",verifyToken,getTask)
router.delete("/deleteTaskById/:id",verifyToken,deleteTaskById)
router.delete("/deleteTaskListById/:id",verifyToken,deleteTaskListById)
router.put("/updateTaskStatus/:id",verifyToken,updateTaskStatus)

export default router