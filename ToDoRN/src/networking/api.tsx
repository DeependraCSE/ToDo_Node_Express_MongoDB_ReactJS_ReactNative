import api from "./axiosInstance"

// user api
export const RegisterApi = async ({firstname, lastname, mobile_no, password}:{firstname : string, lastname : string, mobile_no : string, password : string}) => {
    console.log(firstname, lastname, mobile_no, password)
    const response = await api.post("users/registerUser",{firstname, lastname, mobile_no,password})
    return response.data
}

export const VarifyOTPApi = async ({mobile_no, otp}:{mobile_no : string, otp : string}) => {
    console.log(mobile_no, otp)
    const response = await api.post("users/varifyOTP",{mobile_no,otp})
    return response.data
}

export const ResendOTPApi = async ({mobile_no}:{mobile_no : string}) => {
    console.log(mobile_no)
    const response = await api.post("users/resendOTP",{mobile_no})
    return response.data
}

export const ChangePwdByMblNoApi = async ({mobile_no, password}:{mobile_no : string, password : string}) => {
    console.log(mobile_no)
    const response = await api.post("users/changePwdByMblNo",{mobile_no,password})
    return response.data
}

export const ChangePasswordApi = async ({old_password, new_password}:{old_password : string, new_password : string}) => {
    console.log(old_password, new_password)
    const response = await api.post("users/changePassword",{old_password,new_password})
    return response.data
}

export const LoginApi = async ({mobile_no, password}:{mobile_no : string, password : string}) => {
    console.log(mobile_no, password)
    const response = await api.post("users/login",{mobile_no,password})
    return response.data
}

export const DeleteProfileApi = async () => {
    const response = await api.delete("users/deleteProfile")
    return response.data
}


// task api
export const GetAllTaskListApi = async () => {
    const response = await api.get("tasks/getAllTaskList")
    return response.data
}

export const CreateUpdateTaskListApi = async ({id, title, description}:{id : string, title : string, description : string}) => {
    console.log(id, title, description)
    const response = await api.post("tasks/createUpdateTaskList",{id, title, description})
    return response.data
}

export const GetAllTaskByLastListApi = async (task_list_refrence_id:string) => {
    console.log("task_list_refrence_id",task_list_refrence_id)
    const response = await api.get("tasks/getAllTaskByLastList/"+task_list_refrence_id)
    return response.data
}

export const CreateUpdateTaskApi = async ({id, task_title, task_list_refrence_id}:{id : string, task_title : string, task_list_refrence_id : string}) => {
    console.log(id, task_title, task_list_refrence_id)
    const response = await api.post("tasks/createUpdateTask",{id, task_title, task_list_refrence_id})
    return response.data
}

export const DeleteTaskByIdApi = async (id:string) => {
    console.log("id",id)
    const response = await api.delete("tasks/deleteTaskById/"+id)
    return response.data
}

export const DeleteTaskListByIdApi = async (id:string) => {
    console.log("id",id)
    const response = await api.delete("tasks/deleteTaskListById/"+id)
    return response.data
}

export const UpdateTaskStatusApi = async ({id, is_completed} : {id:string, is_completed:boolean}) => {
    console.log(id, is_completed)
    const response = await api.put("tasks/updateTaskStatus/"+id,{is_completed})
    return response.data
}