import { createStackNavigator } from "@react-navigation/stack";
import TrackingScreen from "../Screens/TrackingScreen";
import ActivityScreen from "../Screens/ActivityScreen";
import FullScreenMap from "../Screens/FullScreenMap";

const TrackActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Tracking Activity" component={TrackingScreen} />
            <appStack.Screen options={{ headerShown: false }} name="ActivityScreen" component={ActivityScreen} />
            <appStack.Screen options={{ headerShown: false }} name="FullScreenMap" component={FullScreenMap} />
        </appStack.Navigator>
    )
}

export default TrackActivityNavigator