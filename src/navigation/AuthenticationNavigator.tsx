import React, {FC} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {AuthenticationRoutes} from '../components/Navigation'

import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import SplashScreen from "../screens/authentication/SplashScreen";
import ForgotPasswordScreen from "../screens/authentication/ForgotPasswordScreen";
import ChangedPasswordScreen from "../screens/authentication/ChangedPasswordScreen";

const Stack = createStackNavigator<AuthenticationRoutes>();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name={"SplashScreen"} component={SplashScreen}/>
      <Stack.Screen name={"SignInScreen"} component={SignInScreen} />
      <Stack.Screen name={"SignUpScreen"} component={SignUpScreen} />
      <Stack.Screen name={"ForgotPasswordScreen"} component={ForgotPasswordScreen} />
      <Stack.Screen name={"ChangedPasswordScreen"} component={ChangedPasswordScreen} />
    </Stack.Navigator>
  )
}

export default AuthenticationNavigator;