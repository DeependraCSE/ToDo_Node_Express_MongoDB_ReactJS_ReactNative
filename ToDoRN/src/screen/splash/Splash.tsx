import { useNavigation } from "@react-navigation/native"
import styles from "../../style/styles"
import { AppLogo, HeadingText } from "../../component/commonComponent"
import { RootStackParamList } from "../../interface/interface"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
type AuthRootProps = NativeStackNavigationProp<RootStackParamList>
import { SafeAreaView } from "react-native-safe-area-context"
import { GetToken } from "../../helper/helperFunction"
const Splash = () => {
    const navigation = useNavigation<AuthRootProps>()
    setTimeout(() => {
        // Navigate to the main app screen
        Redirect()
    }, 3000)

    const Redirect = async () => {
        const token = await GetToken()
        // console.log("token",token)
        if(token){
            navigation.replace('MainRoot')
        }else{
            navigation.replace('AuthRoot')
        }
    }

    return (
        <SafeAreaView style={[styles.containerPlane,{justifyContent:'center', alignItems:'center'}]}>
            <AppLogo/>
            <HeadingText text={"To-Do"}/>
        </SafeAreaView>
    )
}
export default Splash