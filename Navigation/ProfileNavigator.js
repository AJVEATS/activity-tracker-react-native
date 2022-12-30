/**
 * @fileoverview This file represets the ProfileNavigator which is used to navigate between the
 * ProfileScreen and the EditInfoScreen.
 */
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/ProfileScreen";
import EditInfoScreen from '../Screens/EditInfoScreen';

const ProfileNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Profile Screen" component={ProfileScreen} />
            <appStack.Screen options={{ headerShown: false }} name="Edit Info Screen" component={EditInfoScreen} />
        </appStack.Navigator>
    )
}

export default ProfileNavigator