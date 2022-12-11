import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';
import ActivityScreen from './Screens/ActivityScreen';
import TrackingScreen from './Screens/TrackingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainBottomTabNavigator from './Navigation/MainBottomTabNavigator';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name='Login' component={LoginScreen} /> */}
      <Stack.Screen name='Tracking' component={TrackingScreen} />
      <Stack.Screen name='Activity' component={ActivityScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: false,
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;
    //       if (route.name === 'Home') {
    //         iconName = focused
    //           ? 'list'
    //           : 'list-outline';
    //       } else if (route.name === 'Settings') {
    //         iconName = focused
    //           ? 'earth'
    //           : 'earth-outline';
    //       }
    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarActiveTintColor: 'black',
    //     tabBarInactiveTintColor: 'gray',
    //   })}>
    //   <Tab.Screen name="Home" component={TrackingScreen} />
    //   <Tab.Screen name="Settings" component={LoginScreen} />
    // </Tab.Navigator>
    <MainBottomTabNavigator />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <MyStack /> */}
      <MyTabs />
    </NavigationContainer>
  );
}
