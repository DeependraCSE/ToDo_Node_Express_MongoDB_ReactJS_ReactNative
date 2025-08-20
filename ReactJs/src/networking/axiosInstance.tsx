import axios from "axios";
import { GetToken } from "./../helper/helperFunction";
import i18n from "../locales/i18n";

const instance = axios.create({
  baseURL : import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
})

instance.interceptors.request.use(
  async(config) => {
    const token = await GetToken()
    config.headers["Accept-Language"] = i18n.language ?? "en";
    config.headers["Platform"] = 'web';
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }else{
      delete config.headers.Authorization
    }
    return config
  },
  (error)=>Promise.reject(error)
)


// let instance : AxiosInstance;
// if (GetToken()) {
//   instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${GetToken()}`,
//     },
//   });
// } else {
//   instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
//       // 'Authorization': `Bearer ${yourToken}`
//     },
//   });
// }

export default instance;