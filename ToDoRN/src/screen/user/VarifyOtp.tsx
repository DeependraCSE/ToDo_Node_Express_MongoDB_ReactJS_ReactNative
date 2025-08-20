import { useTranslation } from "react-i18next";
import { useState } from "react";
import { VarifyOTPApi, ResendOTPApi } from "../../networking/api";
import type { BaseResponse } from "../../interface/interface";
import {message_type_success}  from "../../constant/constant.json"
import { isOtpValid } from "../../helper/validation";
import { showMessage, ToastType } from "../../helper/helperFunction";
import { View } from "react-native";
import styles from "../../style/styles";
import { AppLogo, CustomButton, Input, LabelText, TextClickWithPreText, HeadingText } from "../../component/commonComponent";

const VarifyOtp = ({mobile_no, successResponse, goBack}:{mobile_no : string,
  successResponse : (response : BaseResponse)=>void , goBack:()=>void}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("")

  const handleSubmit = async() => {
    let type : ToastType
    let title : string
    let message : string

      if(!isOtpValid(otp)){
        type = "info"
        title = t("invalid_input")
        message = t("invalid_otp")
      }else{
        const apiData = { mobile_no, otp }
        const response = await VarifyOTPApi(apiData) as BaseResponse

        type = response?.message_type == message_type_success ? "success" : "error"
        title = response.message
        message = response.display_message
        successResponse(response)   
      }
      showMessage(title,message,type)
  }


  const resendOtp = async () => {
      const apiData = { mobile_no: mobile_no }
      const response = await ResendOTPApi(apiData)
      let type : ToastType = response?.message_type == message_type_success ? "success" : "error"
      showMessage(response.message,response.display_message,type)
      console.log(response)
  }

  return (
    <View style={styles.container}>
        <View style={styles.containerCenter}>
            
            <AppLogo/>

            <HeadingText text={t("verify_account")}/>

            <View style={styles.oneComponentColumn}>
                <LabelText text={t("enter_otp")}/>
                <Input value={otp} placeholder={t("enter_otp")} keyboardType="number-pad"
                onChangeText={setOtp} />
            </View>

            <CustomButton text={t("verify_account")} onClick={()=>{handleSubmit()}} />

            <TextClickWithPreText text={t("resend_otp")} onClick={resendOtp}/>

            <TextClickWithPreText text={t("go_back")} onClick={goBack}/>                        
        </View>
    </View>
  );
};

export default VarifyOtp;
