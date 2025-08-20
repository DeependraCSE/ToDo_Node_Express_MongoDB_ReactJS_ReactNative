import Toast from "react-native-toast-message";
import { LoginItem, LoginResponse } from "../interface/interface";
export type ToastType = "success" | "error" | "info";
import {auth_token, user_info} from "../constant/constant.json"
import { decryptData, encryptData } from "./encryption_decription";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const showMessage = (title:string, message: string, type: ToastType) => {
    Toast.show({
      type: type,  // "success" | "error" | "info"
      text1: title,
      text2: message,
    });
}


export const StoreLoginInfo = (data : LoginResponse) => {
  const token = data.data[0].token
  const userInfo = data.data[0]

  if (token) {
      AsyncStorage.setItem(auth_token, encryptData(token))
  }

  if (userInfo) {
      AsyncStorage.setItem(user_info, encryptData(JSON.stringify(userInfo))) 
  }
}

export const ClearStorage = ()=> {
  AsyncStorage.clear()
}


export const GetToken = async() => {
  const token = await AsyncStorage.getItem(auth_token) ;
  return token ? decryptData(token) : null
}
export const GetUserInfo = async () => {
  let user : LoginItem = new LoginItem()
  const userInfo = await AsyncStorage.getItem(user_info)
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
