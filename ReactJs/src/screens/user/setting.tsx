import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ChangLang from "../../component/changeLang";
import { DeleteButton } from "../../component/commonComonent";
import { DeleteProfile } from "../../navigation/path";
const Setting = ()=> {
  const { t } = useTranslation();
  const navigation = useNavigate()
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
       <div className="flex justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("setting")}
          </h2>
          <ChangLang/><br/>
          <DeleteButton lable={t("delete_profile")} 
            onClick={()=>{navigation(DeleteProfile)}}/>
          </div>
          </div>
      </main>
    </div>
  )
}
export default Setting