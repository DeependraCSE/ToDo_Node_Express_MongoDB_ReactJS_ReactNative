import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClearStorage } from "../../helper/helperFunction"
import { message_type_success } from "../../constant/constant.json";
import { DeleteProfileApi } from "../../networking/api";
import { showMessage } from "../../helper/helperFunction";
import AlertDialog from "../../component/AlertDialog";
import { AppLogo, CustomButtonDanger, LabelText, HeadingText } from "../../component/commonComponent";
import { View } from "react-native";
import styles from "../../style/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interface/interface";
type NavProps = NativeStackNavigationProp<RootStackParamList>
const DeleteProfile = ()=> {
  const { t } = useTranslation();
    const navigation = useNavigation<NavProps>()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleDelete = async() => {
    const response = await DeleteProfileApi()
     if (response.message_type == message_type_success) {
      ClearStorage()
      showMessage(response?.message ?? "",response?.display_message ?? "", "success")    
      navigation.replace("AuthRoot")
    } else {
      showMessage(response?.message ?? "",response?.display_message ?? "", "error")    
    }    
  }
 

   return (
    <>
      <View style={styles.container}>
        <View style={styles.containerCenter}>
            <AppLogo/>
            <HeadingText text={t("delete_profile")}/>
            <LabelText text={t("delete_profile_text")}/>
            <CustomButtonDanger text={t("delete_profile")}  onClick={()=>{setIsDialogOpen(true)}}/>
        </View>
      </View>
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