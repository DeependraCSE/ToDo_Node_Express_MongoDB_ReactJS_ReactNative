import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useMessage } from "../../globalmessage/messagecontext";
import { Button, CheckboxInput, Label, TextClickWithPreText, TextInput } from "../../component/commonComonent";
import { LoginApi } from "../../networking/api";
import {message_type_success}  from "../../constant/constant.json"
import { Register, ForgotPassword, Dashboard} from "../../navigation/path"
import type { LoginResponse } from "../../interface/interface";
import type { AlertType } from "../../component/commonProps";
import { StoreLoginInfo } from "../../helper/helperFunction";
import ChangLang from "../../component/changeLang";
import { isMobileNoValid, isPasswordValid } from "../../helper/validation";

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigate()
  const {showMessage} = useMessage()
  const [mobile_no, setMobile_no] = useState("")
  const [password, setPassword] = useState("")
  const [remember_me, setRemember_me] = useState(true)
  const [loginResponse, setLoginResponse] = useState<LoginResponse>()

  const handleSubmit = async() => {
    let type : AlertType = 'info'
    let title = t("invalid_input")
    if(!isMobileNoValid(mobile_no)){
      showMessage(title,t("invalid_mobile_no"), type)
    }else if(!isPasswordValid(password)){      
      showMessage(title,t("invalid_password"), type)
    }else{
      const data = {mobile_no, password}
      const response = await LoginApi(data)
      setLoginResponse(response)
      console.log(response)
    }      
  }

  useEffect(() => {
    let type : AlertType = loginResponse?.message_type == message_type_success ? "success" : "danger"
    if(loginResponse){
      showMessage(loginResponse.message,loginResponse.display_message, type)
      if(loginResponse.message_type == message_type_success){
        StoreLoginInfo(loginResponse, remember_me)
        navigation(Dashboard, { replace: true })
      }
    }    
  }, [loginResponse]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("sign_in")}
          </h2>
          <form className="space-y-5">
            <div>
              <Label htmlFor={"mobile_no"} text={t("mobile_no")} />
              <TextInput
                type="number"
                id="mobile_no"
                placeholder="1234567890"
                value={mobile_no}
                onChange={(e) => setMobile_no(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={"password"} text={t("password")} />
              <TextInput
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <CheckboxInput
              id="remember_me"
              value={t("remember_me")}
              checked={remember_me}
              onChange={(e) => setRemember_me(e.target.checked)}
            />
            <Button lable={t("sign_in")} onClick={handleSubmit} />
          </form>

          <TextClickWithPreText
            preText={""}
            onClick={(e) => {
              e.preventDefault();
              navigation(ForgotPassword);
            }}
            text={t("forgot_password")}
          />

          <TextClickWithPreText
            preText={t("dont_have_an_account")}
            onClick={(e) => {
              e.preventDefault();
              navigation(Register);
            }}
            text={t("sign_up")}
          />
          <div className="flex items-center justify-center">
          <ChangLang/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
