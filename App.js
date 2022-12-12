import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainBottomTabNavigator from './Navigation/MainBottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainBottomTabNavigator />
    </NavigationContainer>
  );
}
