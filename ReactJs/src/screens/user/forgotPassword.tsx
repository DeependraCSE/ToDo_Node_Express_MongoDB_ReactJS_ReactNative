import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useMessage } from "../../globalmessage/messagecontext";
import { Button, Label, TextClickWithPreText, TextInput } from "../../component/commonComonent";
import { ResendOTPApi, ChangePwdByMblNoApi } from "../../networking/api";
import VarifyOtp from "./varifyOtp";
import {message_type_success}  from "../../constant/constant.json"
import type { AlertType } from "../../component/commonProps";
import type { BaseResponse } from "../../interface/interface";
import { isMobileNoValid, isPasswordValid } from "../../helper/validation";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const {showMessage} = useMessage()
  const [mobile_no, setMobile_no] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [sendOtpResponse, setSendOtpResponse] = useState<BaseResponse>()
  const [changePasswordResponse, setChangePasswordResponse] = useState<BaseResponse>()
  const [showForgotPassword, setShowForgotPassword] = useState(true)
  const [showVerifyOtp, setShowVerifyOtp] = useState(false)
  const [showSetPassword, setShowSetPassword] = useState(false)

  const sendOtp = async () => {
    let type : AlertType = 'info'
    let title = t("invalid_input")
    if(!isMobileNoValid(mobile_no)){
      showMessage(title,t("invalid_mobile_no"), type)
    }else{
      const apiData = { mobile_no }
      const response = await ResendOTPApi(apiData)
      console.log(response)
      setSendOtpResponse(response)
    }      
  } 
  
  const changePassword = async () => {
    let type : AlertType = 'info'
    let title = t("invalid_input")
    if(!isPasswordValid(password)){
      showMessage(title,t("invalid_new_password"), type)
    }else if(!isPasswordValid(confPassword)){
      showMessage(title,t("invalid_conf_password"), type)
    }else if(password != confPassword){
      showMessage(title,t("password_mismatch"), type)
    }else{
      const apiData = { mobile_no: mobile_no, password:password }
      const response = await ChangePwdByMblNoApi(apiData)
      console.log(response)
      setChangePasswordResponse(response)
    }
  }


  useEffect(()=>{
      let type : AlertType      
      if(sendOtpResponse?.message_type == message_type_success ){
        type="success"
        setShowForgotPassword(false)
        setShowVerifyOtp(true)
        setShowSetPassword(false)
      }else{
        type="danger"
        setShowForgotPassword(true)
        setShowVerifyOtp(false)
        setShowSetPassword(false)
      }
      if(sendOtpResponse){
        showMessage(sendOtpResponse.message,sendOtpResponse.display_message, type)
      }
  },[sendOtpResponse])


  useEffect(()=>{
    let type : AlertType      
      if(changePasswordResponse?.message_type == message_type_success ){
        type="success"
        navigation(-1)
      }else{
        type="danger"
      }
      if(changePasswordResponse){
        showMessage(changePasswordResponse.message,changePasswordResponse.display_message, type)
      }
  },[changePasswordResponse])

  return (
    <>
      {
        showForgotPassword && 
        <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {t("forgot_password")}
        </h2>
        <form className="space-y-5">
          
          <div>
            <Label htmlFor={"mobile_no"} text={t("mobile_no")} />
            <TextInput
              type="text"
              id="mobile_no"
              placeholder="1234567890"
              value={mobile_no}
              onChange={(e) => setMobile_no(e.target.value)}
            />
          </div>

          <Button lable={t("submit")} onClick={sendOtp} />
        </form>

        <TextClickWithPreText
          preText={t("want_to_go_back")}
          onClick={(e) => {
            e.preventDefault();
            navigation(-1);
          }}
          text={t("go_back")}
        />
      </div>
    </div>
    }

    {
      showVerifyOtp && 
      <VarifyOtp mobile_no={mobile_no}
      successResponse={(response : BaseResponse)=>{
        if(response && response.message_type == message_type_success){
          setShowForgotPassword(false)
          setShowVerifyOtp(false)
          setShowSetPassword(true)
        }
      }} goBack={()=>{
        setShowForgotPassword(true)
        setShowVerifyOtp(false)
        setShowSetPassword(false)
      }}/>
    }

    {
      showSetPassword && 
       <div className="min-h-screen flex items-center justify-center">
              <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                  {t("reset_password")}
                </h2>
                <form className="space-y-5">
                  
      
                  <div>
                    <Label htmlFor={"password"} text={t("new_password")} />
                    <TextInput
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={"conf_password"} text={t("conf_password")} />
                    <TextInput
                      type="password"
                      id="conf_password"
                      placeholder="••••••••"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
      
                  <Button lable={t("reset_password")} onClick={changePassword} />
                </form>
              </div>
            </div>
    }
    </>
  );
};

export default ForgotPassword;
