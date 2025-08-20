import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangePasswordApi } from "../../networking/api";
import {message_type_success}  from "../../constant/constant.json"
import { isPasswordValid } from "../../helper/validation";
import { showMessage, ToastType } from "../../helper/helperFunction";
import { View } from "react-native";
import styles from "../../style/styles";
import { AppLogo, CustomButton, Input, LabelText, HeadingText } from "../../component/commonComponent";

const ChangePassword = () => {
  const { t } = useTranslation();
  const [old_password, setOld_password] = useState("")
  const [new_password, setNew_password] = useState("")
  const [conf_password, setConf_password] = useState("")
  

  const handleSubmit = async() => {
    let type : ToastType = 'info'
    let title = t("invalid_input")
    console.log(new_password, conf_password)
    if(!isPasswordValid(old_password)){
      showMessage(title, t("invalid_old_password"), type)
    }else if(!isPasswordValid(new_password)){
      showMessage(title, t("invalid_new_password"), type)
    }else if(!isPasswordValid(conf_password)){
      showMessage(title, t("invalid_conf_password"), type)
    }else if(new_password != conf_password){
      showMessage(title, t("password_mismatch"), type)
    }else{
      const data = {old_password, new_password}
      const response = await ChangePasswordApi(data)
      console.log(response)
      type = response?.message_type == message_type_success ? "success" : "error"
      showMessage(response.message,response.display_message, type)
      resetPassword()
    }
  }

  const resetPassword = () => {
    setOld_password("")
    setNew_password("")
    setConf_password("")
  }

  return (
    <>
        <View style={styles.containerPlane}>
                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("old_password")}/>
                    <Input value={old_password} placeholder={t("old_password")} keyboardType="default"
                    onChangeText={setOld_password} isPasswordType={true}/>
                </View>
                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("new_password")}/>
                    <Input value={new_password} placeholder={t("new_password")} keyboardType="default"
                    onChangeText={setNew_password} isPasswordType={true}/>
                </View>
                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("conf_password")}/>
                    <Input value={conf_password} placeholder={t("conf_password")} keyboardType="default"
                    onChangeText={setConf_password} isPasswordType={true}/>
                </View>
              <CustomButton text= {t("change_password")} onClick={handleSubmit} />
          
        </View>
    </>
  );
};

export default ChangePassword;
