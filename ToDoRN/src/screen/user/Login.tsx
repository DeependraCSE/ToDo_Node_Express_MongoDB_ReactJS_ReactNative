import { View } from "react-native"
import styles from "../../style/styles"
import {useTranslation} from 'react-i18next';
import { LabelText, Input, CustomButton, TextClickWithPreText, HeadingText, AppLogo } from "../../component/commonComponent";
import { useState } from "react";
import ChangeLanguage from "../../locale/ChangeLanguage";
import { showMessage, StoreLoginInfo, ToastType } from "../../helper/helperFunction";
import { isMobileNoValid, isPasswordValid } from "../../helper/validation";
import { LoginApi } from "../../networking/api";
import { LoginResponse, RootStackParamList } from "../../interface/interface";
import {message_type_success} from "./../../constant/constant.json"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
type NavProps = NativeStackNavigationProp<RootStackParamList>
const Login = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NavProps>()
    const [mobile_no, setMobile_no] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        let type : ToastType = 'info'
        let title = t("invalid_input")
        if(!isMobileNoValid(mobile_no)){
            showMessage(title,t("invalid_mobile_no"), type)
        }else if(!isPasswordValid(password)){      
            showMessage(title,t("invalid_password"), type)
        }else{
            const data = {mobile_no, password}
            const response = (await LoginApi(data)) as LoginResponse
            console.log(response)

            type = response?.message_type == message_type_success ? "success" : "error"
            showMessage(response.message,response.display_message, type)
            if(response.message_type == message_type_success){
                StoreLoginInfo(response)
                navigation.replace('MainRoot')
            }   
        }     
    }

    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.containerCenter}>
                <AppLogo/>
                
                <HeadingText text={t("sign_in")}/>

                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("mobile_no")}/>
                    <Input value={mobile_no} placeholder={t("mobile_no")} keyboardType="number-pad" 
                    onChangeText={setMobile_no} />
                </View>

                <View style={styles.oneComponentColumn}>
                    <LabelText text={t("password")}/>
                    <Input value={password} placeholder={t("password")} keyboardType="default"
                    onChangeText={setPassword} isPasswordType={true}/>
                </View>
                
                <CustomButton text={t("sign_in")} onClick={handleSubmit} />
                
                <TextClickWithPreText text={t("forgot_password")} onClick={()=>{
                    navigation.navigate("ForgotPassword")
                }}/>

                <TextClickWithPreText preText={t("dont_have_an_account")} text={t("sign_up")} onClick={()=>{
                    navigation.navigate("Register")
                }}/>
                
                <ChangeLanguage/>
            </SafeAreaView>
        </View>
    )
}
export default Login