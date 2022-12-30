/**
 * @fileoverview This file represets the AuthenticationNavigator which is used to navigate between the
 * WelcomeScreen, the LoginScreen and the CreateAccountScreen.
 */
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import CreateAccountScreen from "../Screens/CreateAccountScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";

const AuthenticationNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator >
            <appStack.Screen options={{ headerShown: false }} name="WelcomeScreen" component={WelcomeScreen} />
            <appStack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            <appStack.Screen options={{ headerShown: false }} name="CreateAccountScreen" component={CreateAccountScreen} />
        </appStack.Navigator>
    )
}

export default AuthenticationNavigator