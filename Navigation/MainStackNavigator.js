/**
 * @fileoverview This file represets the MainStackNavigator which is used to navigate between the app's two main 
 * navigators the AuthenticationNavigator (For logging into their account and creating and account) and the
 * MainBottomTabNavigator (which is the main navigator for the app once the user has logged in).
 */
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationNavigator from "./AuthenticationNavigator";
import MainBottomTabNavigator from "./MainBottomTabNavigator";

const MainStackNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator >
            <appStack.Screen options={{ headerShown: false }} name="AuthenticationNavigator" component={AuthenticationNavigator} />
            <appStack.Screen options={{ headerShown: false }} name="MainBottomTabNavigator" component={MainBottomTabNavigator} />
        </appStack.Navigator>
    )
}

export default MainStackNavigator