/**
 * @fileoverview This file represets the ExploreActivityNavigator which is used to navigate between the
 * ExploreSCreen, the PastActivityScreen and the FullScreenMapScreen.
 */
import { createStackNavigator } from "@react-navigation/stack";
import PastActivityScreen from "../Screens/PastActivityScreen";
import ExploreScreen from "../Screens/ExploreScreen";
import FullScreenMapScreen from "../Screens/FullScreenMapScreen";

const ExploreActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Explore" component={ExploreScreen} />
            <appStack.Screen options={{ headerShown: false }} name="PastActivity" component={PastActivityScreen} />
            <appStack.Screen options={{ headerShown: false }} name="FullScreenMap" component={FullScreenMapScreen} />
        </appStack.Navigator>
    )
}

export default ExploreActivityNavigator