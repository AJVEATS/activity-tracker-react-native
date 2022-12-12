import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../colors";
import TrackActivityNavigator from "./TrackActivityNavigator";
import ExploreActivityNavigator from "./ExploreActivityNavigator";
import ProfileScreen from "../Screens/ProfileScreen";
import ExploreScreen from "../Screens/ExploreScreen";

const MainBottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Track Activity') {
                        iconName = focused
                            ? 'walk'
                            : 'walk-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused
                            ? 'person'
                            : 'person-outline';
                    } else if (route.name === 'Explore Routes') {
                        iconName = focused
                            ? 'globe'
                            : 'globe-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Explore Routes" component={ExploreActivityNavigator} />
            <Tab.Screen name="Track Activity" component={TrackActivityNavigator} />
            <Tab.Screen name="Settings" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default MainBottomTabNavigator