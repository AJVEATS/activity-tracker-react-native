import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/ProfileScreen";

const ProfileNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Profile Screen" component={ProfileScreen} />
        </appStack.Navigator>
    )
}

export default ProfileNavigator