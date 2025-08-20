import { Image, KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native"
import styles from "./../style/styles"
import { buttonBgColor, redColor } from "../style/color"
import Icon from "react-native-vector-icons/MaterialIcons";

export const HeadingText = ({text}:{text:string})=> {
    return(<Text style={styles.headingTextStyle}>{text}</Text>)
}

export const TitleText = ({text}:{text:string})=> {
    return(<Text style={styles.titleTextStyle}>{text}</Text>)
}

export const LabelText = ({text}:{text:string})=> {
    return(<Text style={styles.labelStyle}>{text}</Text>)
}

export const LabelDetailText = ({text}:{text:string})=> {
    return(<Text style={styles.labelDetailStyle}>{text}</Text>)
}

export const LabelTinyText = ({text}:{text:string})=> {
    return(<Text style={styles.labelTinyStyle}>{text}</Text>)
}

export const Input = ({value, placeholder, onChangeText,keyboardType, isPasswordType=false, readonly=false}:
    {value:string, placeholder:string, onChangeText:(val:string)=>void, isPasswordType?:boolean, 
        readonly?:boolean, keyboardType:KeyboardTypeOptions })=> {
    return(<TextInput style={styles.inputStyle} value={value} onChangeText={text=>onChangeText(text)}
        secureTextEntry={isPasswordType} readOnly={readonly} placeholder={placeholder} keyboardType={keyboardType}/>)
}

export const CustomButton = ({text, onClick}:{text:string, onClick:()=>void}) => {
    return(<TouchableOpacity style={styles.customButtonStyle} onPress={onClick}>
            <Text style={{color:'white', fontWeight:"bold"}}>{text}</Text>
        </TouchableOpacity>)    
}

export const CustomButtonDanger = ({text, onClick}:{text:string, onClick:()=>void}) => {
    return(<TouchableOpacity style={[styles.customButtonStyle,{backgroundColor:redColor}]} onPress={onClick}>
            <Text style={{color:'white', fontWeight:"bold"}}>{text}</Text>
        </TouchableOpacity>)    
}

export const TextClickWithPreText = ({text, onClick, preText=""}:{text:string, onClick:()=>void, preText?:string}) => {
    return(<View style={styles.textClickWithPreTextStyle}>
            <Text style={styles.labelStyle}>{preText}</Text>
            <Text style={[styles.labelStyle,{color:buttonBgColor}]} onPress={onClick}>{text}</Text>
        </View>)
}

export const AppLogo = () => {
    return(<Image source={require("../assets/app_logo.png")} style={styles.appLogoStyle}/>)
}

export const MaterialIcon = ({text, onClick, color}:{text:string, onClick:()=>void, color: string}) => {
    return(<TouchableOpacity style={{padding:7}} onPress={onClick}>
            <Icon name={text} size={30} color={color} />
        </TouchableOpacity>)    
}

export const ItemSeparator = () => {
    return(
        <View style={styles.separatorStyle}/>
    )
}