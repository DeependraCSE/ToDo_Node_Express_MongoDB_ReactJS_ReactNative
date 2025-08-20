import { Modal, View } from "react-native";
import type { AlertDialogProps } from "./../interface/interface";
import { CustomButton, CustomButtonDanger, LabelText, HeadingText } from "./commonComponent";
import styles from "../style/styles";
import { useTranslation } from "react-i18next";

const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this? This action cannot be undone."
}: AlertDialogProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal
     visible={isOpen}
     transparent
     animationType="fade"
     onRequestClose={onClose}>

        <View style={styles.modalStyleOuter}>
            <View style={styles.modalStyleInner}>
                <HeadingText text={title}/>
                <LabelText text={message}/>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <View style={{flex:1}}>
                        <CustomButton text={t("cancel")} onClick={onClose}/>
                    </View>
                    <View style={{flex:1}}>
                        <CustomButtonDanger text={t("delete")} onClick={()=>{onConfirm(); onClose()}}/>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
  );
}
export default AlertDialog