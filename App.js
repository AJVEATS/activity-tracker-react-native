import { StatusBar } from 'expo-status-bar';
import { Platform, Text, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  let currentLocation = 'Waiting..';
  let currentLongitude = 'Waiting..';
  let currentLatitude = 'Waiting..';
  let currentAltitude = 'Waiting..';
  if (errorMsg) {
    currentLocation = errorMsg;
  } else if (location) {
    // currentLocation = JSON.stringify(location);
    currentAltitude = location['coords']['altitude'];
    currentLatitude = location['coords']['latitude'];
    currentLongitude = location['coords']['longitude'];
    // currentLocation = location;
    console.log(`latitude: ${location['coords']['latitude']}`);
    console.log(`longitude: ${location['coords']['longitude']}`);
    console.log(`altitude: ${location['coords']['altitude']}`);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>Latitude: {currentLatitude}</Text>
      <Text>Longitude: {currentLongitude}</Text>
      <Text>Altitude: {currentAltitude}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
