import axios from "axios";
import { GetToken } from "./../helper/helperFunction";
import i18n from "../locale/i18n";
import { Platform } from "react-native";
import { BASE_URL } from '@env';

const instance = axios.create({
  baseURL : BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
})


instance.interceptors.request.use(
  async (config) => {
    config.headers["Accept-Language"] = i18n.language ?? "en";
    config.headers["Platform"] = Platform.OS;
    const token = await GetToken()   
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }else{
      delete config.headers.Authorization
    }
    return config
  },
  (error)=>Promise.reject(error)
)
export default instance;