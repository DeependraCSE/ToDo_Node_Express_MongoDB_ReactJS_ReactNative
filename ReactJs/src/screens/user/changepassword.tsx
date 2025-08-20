import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMessage } from "../../globalmessage/messagecontext";
import { Button, Label,TextInput } from "../../component/commonComonent";
import { ChangePasswordApi } from "../../networking/api";
import {message_type_success}  from "../../constant/constant.json"
import type { AlertType } from "../../component/commonProps";
import { isPasswordValid } from "../../helper/validation";


const ChangePassword = () => {
  const { t } = useTranslation();
  const { showMessage } = useMessage()
  const [old_password, setOld_password] = useState("")
  const [new_password, setNew_password] = useState("")
  const [conf_password, setConf_password] = useState("")
  

  const handleSubmit = async() => {
    let type : AlertType = 'info'
    let title = t("invalid_input")
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
      type = response?.message_type == message_type_success ? "success" : "danger"
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
       <div className="flex justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("change_password")}
          </h2>
          <form className="space-y-5">
            
            <div>
              <Label htmlFor={"old_password"} text= {t("old_password")} />
              <TextInput
                type="password"
                id="old_password"
                placeholder="••••••••"
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
              />
            </div>

           <div>
              <Label htmlFor={"new_password"} text= {t("new_password")} />
              <TextInput
                type="password"
                id="new_password"
                placeholder="••••••••"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
              />
            </div>
           
           <div>
              <Label htmlFor={"conf_password"} text= {t("conf_password")} />
              <TextInput
                type="password"
                id="conf_password"
                placeholder="••••••••"
                value={conf_password}
                onChange={(e) => setConf_password(e.target.value)}
              />
            </div>

            <Button lable= {t("change_password")} onClick={handleSubmit} />
          </form>

          
        </div>
      </div>
    </main>
    </div>
  );
};

export default ChangePassword;
