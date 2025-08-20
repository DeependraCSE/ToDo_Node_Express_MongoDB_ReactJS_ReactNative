import { useTranslation } from "react-i18next";
import { CustomButtonDanger } from "../../component/commonComponent";
import ChangeLanguage from "../../locale/ChangeLanguage";
import { View } from "react-native";
import styles from "../../style/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../interface/interface";
type NavProps = NativeStackNavigationProp<RootStackParamList>
const Setting = ()=> {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProps>()
  
  return (
    <>
      <View style={styles.containerPlane}>
          <ChangeLanguage/>
          <View style={{flex:1}}/>
          <CustomButtonDanger text={t("delete_profile")} 
            onClick={()=>{navigation.navigate("DeleteProfile")}}/>       
      </View>
    </>
  )
}
export default Setting