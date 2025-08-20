import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMessage } from "../../globalmessage/messagecontext";
import { Button, Label, TextInput, TextClickWithPreText } from "../../component/commonComonent";
import { VarifyOTPApi, ResendOTPApi } from "../../networking/api";
import type { BaseResponse } from "../../interface/interface";
import {message_type_success}  from "../../constant/constant.json"
import type { AlertType } from "../../component/commonProps";
import { isOtpValid } from "../../helper/validation";

const VarifyOtp = ({mobile_no, successResponse, goBack}:{mobile_no : string,
  successResponse : (response : BaseResponse)=>void , goBack:()=>void}) => {
  const { t } = useTranslation();
  const { showMessage } = useMessage()
  const [otp, setOtp] = useState("")

  const handleSubmit = async() => {
    let type : AlertType
    let title : string
    let message : string

      if(!isOtpValid(otp)){
        type = "info"
        title = t("invalid_input")
        message = t("invalid_otp")
      }else{
        const apiData = { mobile_no, otp }
        const response = await VarifyOTPApi(apiData) as BaseResponse

        type = response?.message_type == message_type_success ? "success" : "danger"
        title = response.message
        message = response.display_message
        successResponse(response)   
      }
      showMessage(title,message,type)
  }


  const resendOtp = async () => {
      const apiData = { mobile_no: mobile_no }
      const response = await ResendOTPApi(apiData)
      let type : AlertType = response?.message_type == message_type_success ? "success" : "danger"
      showMessage(response.message,response.display_message,type)
      console.log(response)
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {t("verify_account")}
        </h2>
        <form className="space-y-5">
          <div>
            <Label htmlFor={"enter_otp"} text={t("enter_otp")} />
            <TextInput
              type="text"
              id="enter_otp"
              placeholder="1234"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <Button lable={t("verify_account")} onClick={handleSubmit} />
        </form>

        <TextClickWithPreText
          onClick={(e) => {
            e.preventDefault();
            resendOtp();
          }}
          text={t("resend_otp")}
        />

        <TextClickWithPreText
          onClick={(e) => {
            e.preventDefault();
            goBack()
          }}
          text={t("go_back")}
        />
      </div>
    </div>
    </>
  );
};

export default VarifyOtp;
