import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';
import ActivityScreen from './Screens/ActivityScreen';
import TrackingScreen from './Screens/TrackingScreen';

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

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
