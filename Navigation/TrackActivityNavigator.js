/**
 * @fileoverview This file represets the TrackActivitynNavigator which is used to navigate between
 * the TrackingScreen, the ActivityScreen and the FullMapScreen.
 */
import { createStackNavigator } from "@react-navigation/stack";
import TrackingScreen from "../Screens/TrackingScreen";
import ActivityScreen from "../Screens/ActivityScreen";
import FullScreenMapScreen from "../Screens/FullScreenMapScreen";

const TrackActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Tracking Activity" component={TrackingScreen} />
            <appStack.Screen options={{ headerShown: false }} name="ActivityScreen" component={ActivityScreen} />
            <appStack.Screen options={{ headerShown: false }} name="FullScreenMap" component={FullScreenMapScreen} />
        </appStack.Navigator>
    )
}

export default TrackActivityNavigator