import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextClickWithPreText } from "../../component/commonComonent";
import { ClearStorage } from "../../helper/helperFunction"
import { Login } from "../../navigation/path";
const Logout = ()=> {
  const navigation = useNavigate()
  const { t } = useTranslation();
    useEffect(()=>{
        ClearStorage()
    },[])

   return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("logout")}
          </h2>
          <TextClickWithPreText text={t("login_again")} preText={t("logout_success")} 
            onClick={(e) => {
              e.preventDefault();
              navigation(Login, { replace: true })
            }}/>
        </div>
      </div>
    </>
  );
}
export default Logout