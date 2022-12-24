import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import CreateAccountScreen from "../Screens/CreateAccountScreen";

const AuthenticationNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator >
            {/* <appStack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} /> */}
            <appStack.Screen options={{ headerShown: false }} name="CreateAccountScreen" component={CreateAccountScreen} />
        </appStack.Navigator>
    )
}

export default AuthenticationNavigator