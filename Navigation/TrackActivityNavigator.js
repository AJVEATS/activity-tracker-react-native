import { createStackNavigator } from "@react-navigation/stack";
import TrackingScreen from "../Screens/TrackingScreen";
import ActivityScreen from "../Screens/ActivityScreen";

const TrackActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen name="Tracking Activity" component={TrackingScreen} />
            <appStack.Screen name="ActivityScreen" component={ActivityScreen} />
        </appStack.Navigator>
    )
}

export default TrackActivityNavigator