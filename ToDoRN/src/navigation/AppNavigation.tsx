import React from "react"
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import "./../locale/i18n"
import { RootStackParamList } from "../interface/interface";

import SplashScreen from "../screen/splash/Splash";
import ChangePasswordScreen from "../screen/user/ChangePassword";
import DeleteProfileScreen from "../screen/user/DeleteProfile";
import ForgotPasswordScreen from "../screen/user/ForgotPassword";
import LoginScreen from "../screen/user/Login";
import ProfileScreen from "../screen/user/Profile";
import RegisterScreen from "../screen/user/Register";
import SettingScreen from "../screen/user/Setting";
import TaskListScreen from "../screen/task/TaskList";
import TaskScreen from "../screen/task/Task";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>()

const SplashStack = () => {
    return(
        <Stack.Navigator initialRouteName="Splash" 
            screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

const AuthStack = () => {
    return(
        <Stack.Navigator initialRouteName="Login" 
            screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

const MainStack = () => {
    return(
        <Stack.Navigator initialRouteName="TaskList" >
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="DeleteProfile" component={DeleteProfileScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="TaskList" component={TaskListScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    return(
    <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashRoot" screenOptions={{ headerShown: false }}>
                <Stack.Screen component={SplashStack} name="SplashRoot"/>
                <Stack.Screen component={AuthStack} name="AuthRoot"/>
                <Stack.Screen component={MainStack} name="MainRoot"/>
            </Stack.Navigator>
        </NavigationContainer>
        <Toast
            config={{
                success: (internalState) => (
                    <View style={{ padding: 15, backgroundColor: "green", borderRadius: 10 }}>
                        <Text style={{ color: "white" }}>{internalState.text1}</Text>
                        <Text style={{ color: "white" }}>{internalState.text2}</Text>
                    </View>
                ),
                error: (internalState) => (
                    <View style={{ padding: 15, backgroundColor: "red", borderRadius: 10 }}>
                        <Text style={{ color: "white" }}>{internalState.text1}</Text>
                        <Text style={{ color: "white" }}>{internalState.text2}</Text>
                    </View>
                ),
                info: (internalState) => (
                    <View style={{ padding: 15, backgroundColor: "orange", borderRadius: 10 }}>
                        <Text style={{ color: "white" }}>{internalState.text1}</Text>
                        <Text style={{ color: "white" }}>{internalState.text2}</Text>
                    </View>
                )
            }}
        />
    </>

    )
}
 
export default AppNavigation