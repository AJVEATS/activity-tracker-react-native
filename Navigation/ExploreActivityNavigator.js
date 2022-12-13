import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../Screens/ExploreScreen";

const ExploreActivityNavigator = () => {
    const appStack = createStackNavigator();
    return (
        <appStack.Navigator>
            <appStack.Screen options={{ headerShown: false }} name="Explore" component={ExploreScreen} />
        </appStack.Navigator>
    )
}

export default ExploreActivityNavigator