import { useTranslation } from "react-i18next";
import { GetUserInfo } from "../../helper/helperFunction"
import { LoginItem } from "../../interface/interface"
import { View } from "react-native";
import styles from "../../style/styles";
import { AppLogo, Input, LabelText, HeadingText } from "../../component/commonComponent";
import { useEffect, useState } from "react";
const Profile = ()=> {
  const { t } = useTranslation();
  const[userInfo, setUserInfo] = useState<LoginItem>(new LoginItem)
  
  const GetUser = async () => {
    const user = await GetUserInfo()
    setUserInfo(user)
  }

  useEffect(()=>{
    GetUser()
  },[])

  return (
    <>
      <View style={styles.containerPlane}>
            <View style={styles.oneComponentColumn}>
                  <LabelText text={t("firstname")}/>
                  <Input value={userInfo.firstname} placeholder={t("firstname")} keyboardType="default"
                  onChangeText={()=>{}} readonly={true}/>
              </View>

              <View style={styles.oneComponentColumn}>
                  <LabelText text={t("lastname")}/>
                  <Input value={userInfo.lastname} placeholder={t("lastname")} keyboardType="default"
                  onChangeText={()=>{}} readonly={true}/>
              </View>

              <View style={styles.oneComponentColumn}>
                  <LabelText text={t("mobile_no")}/>
                  <Input value={userInfo.mobile_no+""} placeholder={t("mobile_no")} keyboardType="number-pad"
                  onChangeText={()=>{}} readonly={true}/>
              </View>
      </View>
    </>
   
  )
}
export default Profile