import { useTranslation } from "react-i18next";
import { GetUserInfo } from "../../helper/helperFunction"
import type { LoginItem } from "../../interface/interface"
import { Label, TextInput } from "../../component/commonComonent"
const Profile = ()=> {
  const { t } = useTranslation();
  const userInfo : LoginItem  = GetUserInfo()
  // console.log("userInfo",userInfo)
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
       <div className="flex justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("profile")}
          </h2>
          <div className="space-y-5" >
          
                    <div>
                      <Label htmlFor={"firstname"} text={t("firstname")}/>
                      <TextInput type="text" id="firstname" placeholder="Jac" value={userInfo?.firstname} disable={true}/>
                    </div>
          
                    <div>
                      <Label htmlFor={"lastname"} text={t("lastname")}/>
                      <TextInput type="text" id="lastname" placeholder="Smith" value={userInfo?.lastname}  disable={true}/>
                    </div>
          
                    <div>
                      <Label htmlFor={"mobile_no"} text={t("mobile_no")}/>
                      <TextInput type="number" id="mobile_no" placeholder="1234567890" value={userInfo?.mobile_no}  disable={true}/>
                    </div>
                    </div>
          </div>
          </div>
      </main>
    </div>
  )
}
export default Profile