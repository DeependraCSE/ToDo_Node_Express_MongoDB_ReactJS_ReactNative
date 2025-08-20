import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../style/styles";
import * as Constant from "./../constant/constant.json"
import { useTranslation } from "react-i18next";

const CustomMenu = ({open, close, onMenuOptionClick}:
    {open : boolean, close:()=>void, onMenuOptionClick:(option:number)=>void}
    ) => {
    const {t} = useTranslation()

    const menuOptions = [
    {key : "profile", title:t("profile"), option:Constant.ProfileMenuOption},
    {key : "changepassword", title:t("change_password"), option:Constant.ChangePasswordMenuOption},
    {key : "setting", title:t("setting"), option:Constant.SettingMenuOption},
    {key : "logout", title:t("logout"), option:Constant.LogoutMenuOption},
]
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={close}>
    <View style={styles.menuOverlayStyle}>
        <View style={styles.menuBoxStyle}>
            {menuOptions.map((menu)=>{
                return(
                    <TouchableOpacity key={menu.key} onPress={() => {onMenuOptionClick(menu.option), close()}}>
                        <Text style={styles.menuItemStyle}>{menu.title}</Text>
                    </TouchableOpacity>
                )
            })}        
        </View>
    </View>
    </Modal>
  );
};


export default CustomMenu;
