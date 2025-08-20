import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DeleteButton, Label } from "../../component/commonComonent";
import { ClearStorage } from "../../helper/helperFunction"
import { Login } from "../../navigation/path";
import { message_type_success } from "../../constant/constant.json";
import { useMessage } from "../../globalmessage/messagecontext";
import AlertDialog from "../../component/alertDialog";
import { DeleteProfileApi } from "../../networking/api";
const DeleteProfile = ()=> {
  const navigation = useNavigate()
  const {showMessage} = useMessage()
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleDelete = async() => {
    const response = await DeleteProfileApi()
     if (response.message_type == message_type_success) {
      ClearStorage()
      showMessage(response?.message ?? "",response?.display_message ?? "", "success")    
      navigation(Login,{ replace: true })
    } else {
      showMessage(response?.message ?? "",response?.display_message ?? "", "danger")    
    }    
  }
 

   return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {t("delete_profile")}
          </h2>
          <Label htmlFor="" text={t("delete_profile_text")}/>
          <br/>
          <DeleteButton lable={t("delete_profile")} 
            onClick={()=>{setIsDialogOpen(true)}}/>
        </div>
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("confirm_delete")}
        message={t("confirm_delete_message")}
      />
    </>
  );
}
export default DeleteProfile