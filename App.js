import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './Navigation/MainStackNavigator';
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreLogs([
    'Require cycle:',
    'AsyncStorage'
  ]);

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
