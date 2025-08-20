import type { JSX } from "react";

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
export type AlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export type RootStackParamList = {
  SplashRoot: undefined;
  AuthRoot: undefined;
  MainRoot: undefined;
  Splash: undefined;
  ChangePassword: undefined;
  DeleteProfile: undefined;
  ForgotPassword: undefined;
  Login: undefined;
  Profile: undefined;
  Register: undefined;
  Setting: undefined;
  TaskList: undefined;
  Task: TaskListData;
};