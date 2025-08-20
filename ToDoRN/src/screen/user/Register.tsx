import { View } from "react-native"
import styles from "../../style/styles"
import {useTranslation} from 'react-i18next';
import { LabelText, Input, CustomButton, TextClickWithPreText, HeadingText, AppLogo } from "../../component/commonComponent";
import { useState } from "react";
import { showMessage, ToastType } from "../../helper/helperFunction";
import { isMobileNoValid, isNameValid, isPasswordValid } from "../../helper/validation";
import { RegisterApi } from "../../networking/api";
import { BaseResponse, RegisterResponse } from "../../interface/interface";
import {message_type_success} from "./../../constant/constant.json"
import VarifyOtp from "./VarifyOtp";
import { RootStackParamList } from "../../interface/interface";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavProps = NativeStackNavigationProp<RootStackParamList>
const Register = () => {
    const {t} = useTranslation();
    const navigation = useNavigation<NavProps>()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [mobile_no, setMobile_no] = useState("")
    const [password, setPassword] = useState("")
    const [showVarifyOTP, setShowVarifyOTP] = useState(false)
    const [apiResponse, setApiResponse] = useState<RegisterResponse>(new RegisterResponse())

    const handleSubmit = async () => {
        let type : ToastType = 'info'
        let title = t("invalid_input")
        let message;
        if(!isNameValid(firstname)){
            message = t("invalid_first_name")
        }else if(!isNameValid(lastname)){
            message = t("invalid_last_name")
        }else if(!isMobileNoValid(mobile_no)){
            message = t("invalid_mobile_no")
        }else if(!isPasswordValid(password)){
            message = t("invalid_password")
        }else{
            const data = {firstname, lastname, mobile_no, password}
            const response = await RegisterApi(data) as RegisterResponse
            console.log(response)
            setApiResponse(response)
            title = response.message
            message = response.display_message
            if(response?.message_type == message_type_success){
                setShowVarifyOTP(true)
                type = "success"
            }else{
                setShowVarifyOTP(false)
                type = "error"
            }            
        }  
        
        showMessage(title,message, type)
    }

    return(
        <View style={styles.container}>
            {showVarifyOTP ? 
                <VarifyOtp mobile_no={apiResponse?.data[0]?.mobile_no ?? ""}
                    successResponse={(response : BaseResponse)=>{
                        if(response && response.message_type == message_type_success){
                            navigation.goBack()
                        }
                    }} goBack={()=>{setShowVarifyOTP(false)}}/>
                :
                <View style={styles.containerCenter}>

                    <AppLogo/>
                    
                    <HeadingText text={t("sign_up")}/>

                    <View style={styles.oneComponentColumn}>
                        <LabelText text={t("firstname")}/>
                        <Input value={firstname} placeholder={t("firstname")} keyboardType="default"
                        onChangeText={setFirstname} />
                    </View>

                    <View style={styles.oneComponentColumn}>
                        <LabelText text={t("lastname")}/>
                        <Input value={lastname} placeholder={t("lastname")} keyboardType="default"
                        onChangeText={setLastname} />
                    </View>

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
                    
                    <CustomButton text={t("sign_up")} onClick={()=>{handleSubmit()}} />

                    <TextClickWithPreText preText={t("already_have_an_account")} text={t("sign_in")} onClick={()=>{
                        navigation.goBack()
                    }}/>
                    
                </View>
            }       
        </View>
    )
}
export default Register