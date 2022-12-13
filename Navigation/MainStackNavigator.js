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