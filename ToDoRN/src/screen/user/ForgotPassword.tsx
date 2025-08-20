import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ResendOTPApi, ChangePwdByMblNoApi } from "../../networking/api";
import {message_type_success}  from "../../constant/constant.json"
import type { BaseResponse, RootStackParamList } from "../../interface/interface";
import { isMobileNoValid, isPasswordValid } from "../../helper/validation";
import { showMessage, ToastType } from "../../helper/helperFunction";
import { View } from "react-native";
import styles from "../../style/styles";
import { AppLogo, CustomButton, Input, LabelText, TextClickWithPreText, HeadingText } from "../../component/commonComponent";
import VarifyOtp from "./VarifyOtp";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavProps = NativeStackNavigationProp<RootStackParamList>


const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProps>()
  const [mobile_no, setMobile_no] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(true)
  const [showVerifyOtp, setShowVerifyOtp] = useState(false)
  const [showSetPassword, setShowSetPassword] = useState(false)

  const sendOtp = async () => {
    let type : ToastType
    let title
    let message
    if(!isMobileNoValid(mobile_no)){
        type  = 'info'
        title = t("invalid_input")
        message = t("invalid_mobile_no")
    }else{
        const apiData = { mobile_no }
        const response = await ResendOTPApi(apiData) as BaseResponse
        console.log(response)
        
        title = response.message
        message = response.display_message
        
        if(response?.message_type == message_type_success ){
            type="success"            
            setShowForgotPassword(false)
            setShowVerifyOtp(true)
            setShowSetPassword(false)
        }else{
            type="error"
            setShowForgotPassword(true)
            setShowVerifyOtp(false)
            setShowSetPassword(false)
            }
        }  
        showMessage(title,message, type)    
  } 
  
  const changePassword = async () => {
    let type : ToastType = 'info'
    let title = t("invalid_input")
    let message;
    if(!isPasswordValid(password)){
        message = t("invalid_new_password")
        showMessage(title,message, type)
    }else if(!isPasswordValid(confPassword)){
        message = t("invalid_conf_password")
        showMessage(title,message, type)
    }else if(password != confPassword){
        message = t("password_mismatch")
        showMessage(title,message, type)
    }else{
        const apiData = { mobile_no: mobile_no, password:password }
        const response = await ChangePwdByMblNoApi(apiData) as BaseResponse
        console.log(response)
        title = response.message
        message = response.display_message
        type = response?.message_type == message_type_success ? "success" : "error"
        showMessage(title,message, type)

        if(response?.message_type == message_type_success ){
            navigation.goBack()
        }
    }
  }

  return (
    <>
      {
        showForgotPassword && 
        <View style={styles.container}>
            <View style={styles.containerCenter}>
                <AppLogo/>
                <HeadingText text={t("forgot_password")}/>
                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("mobile_no")}/>
                    <Input placeholder={t("mobile_no")} value={mobile_no} keyboardType="number-pad" onChangeText={setMobile_no} />
                </View>
                <CustomButton text={t("submit")} onClick={sendOtp} />
                <TextClickWithPreText preText={t("want_to_go_back")} text={t("go_back")} onClick={()=>{
                    navigation.goBack() 
                }}/>
            </View>
        </View>
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
        <View style={styles.container}>
                <View style={styles.containerCenter}>
                    <AppLogo/>
                    <HeadingText text={t("reset_password")}/>
                    <View style={styles.oneComponentColumn}>
                        <LabelText text={t("new_password")}/>
                        <Input value={password} placeholder={t("new_password")}  keyboardType="default"
                        onChangeText={setPassword} isPasswordType={true}/>
                    </View>
                    

                    <View style={styles.oneComponentColumn}>
                        <LabelText text={t("conf_password")}/>
                        <Input value={confPassword} placeholder={t("conf_password")} keyboardType="default"
                        onChangeText={setConfPassword} isPasswordType={true}/>
                    </View>
                    <CustomButton text={t("reset_password")} onClick={changePassword} />
                </View>
        </View>
    }
    </>
  );
};

export default ForgotPassword;
