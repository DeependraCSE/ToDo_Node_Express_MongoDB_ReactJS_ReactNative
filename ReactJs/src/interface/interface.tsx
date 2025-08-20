import type { JSX } from "react";
import type { AlertType } from "../component/commonProps";

export interface ProtectedRouteProps {
  children: JSX.Element;
}

export class BaseResponse{
    message_type : number = 0
    message : string = ""
    display_message : string = ""
    data : any[] = []
}

export class LoginItem{
    firstname : string = ""
    lastname : string = ""
    mobile_no : string = ""
    is_mobile_no_varified : boolean = false
    token : string = ""
}

export class LoginResponse extends BaseResponse{
    data : LoginItem[] = []
}

export class RegisterItem{
    mobile_no : string = ""
}

export class RegisterResponse extends BaseResponse{
    data : RegisterItem[] = []
}

export class TaskListData{
    title: string = ""
    description: string = ""
    created_at: string = ""
    last_modify: string = ""
    id: string = ""
}

export class TaskListResponse extends BaseResponse{
    data : TaskListData[] = []
}

export class TaskData{
    task_title: string = ""
    is_completed: boolean = false
    created_at: string = ""
    last_modify: string = ""
    task_list_refrence_id: string = ""
    id: string = ""
}

export class TaskResponse extends BaseResponse{
    data : TaskData[] = []
}



export interface MessageContextType {
  showMessage: (title:string, message: string, type?: AlertType) => void;
}

export interface Message {
    id: number;
    title:string; 
    message: string;
    type: AlertType;
}
