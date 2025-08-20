import type { LoginResponse } from "../interface/interface";
import { LoginItem } from "../interface/interface";
import { encryptData, decryptData } from "./encryption_decription";
import {auth_token, user_info} from "./../constant/constant.json"

export const customConsole = (...args: any[]) => {
  console.log(args);
}

export const StoreLoginInfo = (data : LoginResponse, remember_me:boolean) => {
  const token = data.data[0].token
  const userInfo = data.data[0]
  console.log("token", token)
  console.log("userInfo", userInfo)
  if (token) {
    if(remember_me){
      localStorage.setItem(auth_token, encryptData(token))
    }else{
      sessionStorage.setItem(auth_token, encryptData(token))
    }
  }

  if (userInfo) {
    if(remember_me){
      localStorage.setItem(user_info, encryptData(JSON.stringify(userInfo)))
    }else{
      sessionStorage.setItem(user_info, encryptData(JSON.stringify(userInfo)))
    }      
  }
}

export const ClearStorage = ()=> {
  sessionStorage.clear()
  localStorage.clear()
}

export const GetToken = () => {
  const token = localStorage.getItem(auth_token) || sessionStorage.getItem(auth_token) ;
  return token ? decryptData(token) : null
}
export const GetUserInfo = () => {
  let user :LoginItem = new LoginItem()
  const userInfo = localStorage.getItem(user_info) || sessionStorage.getItem(user_info)
  if(userInfo){
    user = JSON.parse(decryptData(userInfo)) as LoginItem 
  }
  return user
}

export const LocalDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const GetMsgId = ():string => {
  return (new Date().getTime().toString())
};
