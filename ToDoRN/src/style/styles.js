import { StyleSheet } from "react-native";
import { bgColor, borderColor, textColor,inputColor, buttonBgColor, whiteColor } from "./color";
import * as Constant from "../constant/constant.json"
const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : Constant.standerd_padding,
        backgroundColor : bgColor,
    },
    containerPlane : {
        flex : 1,
        padding : Constant.standerd_padding,
        backgroundColor : whiteColor
    },
    containerCenter : {
        flex:1,
        justifyContent:'center',
        backgroundColor : whiteColor,
        margin:Constant.standerd_margin,
        padding:Constant.standerd_padding,
        borderWidth:1,
        borderRadius:10,
        shadowColor: borderColor  
    },
    headingTextStyle:{
        alignSelf:'center', 
        fontSize:24, 
        padding:Constant.standerd_padding, 
        margin:Constant.standerd_margin, 
        color:buttonBgColor, 
        fontWeight:'bold' 
    },
    titleTextStyle:{ 
        fontSize:18, 
        margin:Constant.standerd_margin, 
        color:buttonBgColor, 
    },
    labelStyle:{ 
        fontSize:18, 
        color:textColor, 
        padding:Constant.standerd_padding
    },
    labelDetailStyle:{ 
        fontSize:14, 
        color:textColor, 
        padding:Constant.standerd_padding
    },
    labelTinyStyle:{ 
        fontSize:10, 
        color:textColor, 
        padding:Constant.standerd_padding
    },
    inputStyle:{ 
        borderWidth:1, 
        borderRadius:10, 
        borderBlockColor:borderColor, 
        padding:Constant.standerd_padding, 
        fontSize:18, 
        color:inputColor, 
        height:40
    },
    oneComponentColumn:{
        flexDirection:'column', 
        padding:Constant.standerd_padding, 
        marginBottom:Constant.standerd_margin
    },
    customButtonStyle:{
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor:buttonBgColor, 
        height:50, 
        borderRadius:10, 
        borderColor:borderColor,
        margin:Constant.standerd_margin, 
        marginTop:Constant.standerd_margin
    },
    textClickWithPreTextStyle:{
        flexDirection:"row", 
        alignItems:'center', 
        justifyContent:'center', 
        margin:Constant.standerd_margin, 
        marginTop:Constant.standerd_margin
    },
    appLogoStyle:{
        height:100, 
        width:100, 
        resizeMode:'contain', 
        alignSelf:'center'
    },
    emptyContainer:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modalStyleOuter:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalStyleInner:{
        width: "80%", 
        backgroundColor: "white", 
        borderRadius: 12, 
        padding: 20, 
        elevation: 5
    },
    separatorStyle:{
        height:1, 
        backgroundColor:buttonBgColor, 
        marginLeft:Constant.standerd_margin, 
        marginRight:Constant.standerd_margin
    },
    menuOverlayStyle:{
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "flex-end", 
        marginTop:60, 
        marginRight:10 
    },
    menuBoxStyle:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        width: 200,
    },
    menuItemStyle:{ 
        fontSize: 16,
         padding: 10 
    }
    
})

export default styles