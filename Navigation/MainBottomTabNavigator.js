/**
 * @fileoverview This file represets the MainBottomTabNavigator which displays a bottom
 * tab navigator and is used to navigate between 3 stack navigators the ProfileNavigator,
 * the TrackActivityNavigator and the ExploreActivityNavigator.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreActivityNavigator from "./ExploreActivityNavigator";
import TrackActivityNavigator from "./TrackActivityNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileNavigator from "./ProfileNavigator";
import colors from "../colors";

const MainBottomTabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Track Activity"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Track Activity') {
                        iconName = focused
                            ? 'stopwatch'
                            : 'stopwatch-outline';
                    } else if (route.name === 'Your Profile') {
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
                tabBarActiveTintColor: colors.black,
                tabBarInactiveTintColor: colors.gray,
            })}>
            <Tab.Screen name="Explore Routes" component={ExploreActivityNavigator} />
            <Tab.Screen name="Track Activity" component={TrackActivityNavigator} />
            <Tab.Screen name="Your Profile" component={ProfileNavigator} />
        </Tab.Navigator>
    );
}

export default MainBottomTabNavigator