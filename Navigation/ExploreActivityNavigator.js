import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../Screens/ExploreScreen";
import FullScreenMap from "../Screens/FullScreenMap";
import PastActivityScreen from "../Screens/PastActivityScreen";

const ExploreActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Explore" component={ExploreScreen} />
            <appStack.Screen options={{ headerShown: false }} name="PastActivity" component={PastActivityScreen} />
            <appStack.Screen options={{ headerShown: false }} name="FullScreenMap" component={FullScreenMap} />
        </appStack.Navigator>
    )
}

export default ExploreActivityNavigator