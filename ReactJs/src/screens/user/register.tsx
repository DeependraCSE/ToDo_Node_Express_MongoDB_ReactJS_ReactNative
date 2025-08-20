import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMessage } from "../../globalmessage/messagecontext";
import { useEffect, useState } from "react";
import { Button, Label, TextClickWithPreText, TextInput } from "../../component/commonComonent";
import { RegisterApi } from "../../networking/api";
import {message_type_success}  from "../../constant/constant.json"
import VarifyOtp from "./varifyOtp"
import type { RegisterResponse, BaseResponse } from "../../interface/interface";
import type { AlertType } from "../../component/commonProps";
import { isNameValid, isMobileNoValid, isPasswordValid } from "../../helper/validation";


const Register = () => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const { showMessage } = useMessage()
  const [mobile_no, setMobile_no] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [password, setPassword] = useState("")
  const [showVarifyOTP, setShowVarifyOTP] = useState(false)
  const [apiResponse, setApiResponse] = useState<RegisterResponse>()

  const handleSubmit = async() => {
    let type : AlertType = 'info'
    let title =  t("invalid_input")
    if(!isNameValid(firstname)){
      showMessage(title,t("invalid_first_name"), type)
    }else if(!isNameValid(lastname)){
      showMessage(title,t("invalid_last_name"), type)
    }else if(!isMobileNoValid(mobile_no)){
      showMessage(title,t("invalid_mobile_no"), type)
    }else if(!isPasswordValid(password)){
      showMessage(title,t("invalid_password"), type)
    }else{
      const data = {firstname, lastname, mobile_no, password}
      const response = await RegisterApi(data)
      console.log(response)
      setApiResponse(response)
    }      
  }


  useEffect(()=>{
    let type : AlertType
    if(apiResponse?.message_type == message_type_success){
      setShowVarifyOTP(true)
      type = "success"
    }else{
      setShowVarifyOTP(false)
      type = "danger"
    }
    if(apiResponse){
      showMessage(apiResponse?.message,apiResponse.display_message, type)
    }
  },[apiResponse])



  return (
    <>
    {
      showVarifyOTP && apiResponse
      ? 
      <VarifyOtp mobile_no={apiResponse.data[0].mobile_no}
      successResponse={(response : BaseResponse)=>{
        if(response && response.message_type == message_type_success){
          navigation(-1)
        }
      }} goBack={()=>{setShowVarifyOTP(false)}}/>
      :
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {t("sign_up")}
        </h2>
        <form className="space-y-5" >

          <div>
            <Label htmlFor={"firstname"} text={t("firstname")}/>
            <TextInput type="text" id="firstname" placeholder="Jac" value={firstname} onChange={e => setFirstname(e.target.value)}/>
          </div>

          <div>
            <Label htmlFor={"lastname"} text={t("lastname")}/>
            <TextInput type="text" id="lastname" placeholder="Smith" value={lastname} onChange={e => setLastname(e.target.value)}/>
          </div>

          <div>
            <Label htmlFor={"mobile_no"} text={t("mobile_no")}/>
            <TextInput type="number" id="mobile_no" placeholder="1234567890" value={mobile_no} onChange={e => setMobile_no(e.target.value)}/>
          </div>

          <div>
            <Label htmlFor={"password"} text={t("password")}/>
            <TextInput type="password" id="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>

          <Button lable={t("sign_up")} onClick={handleSubmit}/>
          
        </form>

        <TextClickWithPreText preText={t("already_have_an_account")} onClick={e => {
          e.preventDefault()
          navigation(-1)
        }} text={t("sign_in")}/>
      </div>
    </div>
    }
    
    </>
  );
};

export default Register;
