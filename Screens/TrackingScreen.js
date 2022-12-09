import { Platform, Text, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function TrackingScreen() {

    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinatesArray, setCoordinatesArray] = useState([]);
    const [activityStarted, setActivityStarted] = useState(false);

    useEffect(() => {
        if (activityStarted) {
            console.log('activity tracking started');
            const interval = setInterval(() => {
                (async () => {

                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permission to access location was denied');
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    setLocation(location);
                    coordinatesArray.push({ latitude: location['coords']['latitude'], longitude: location['coords']['longitude'] });
                    console.log(coordinatesArray);
                })();
            }, 1500);
            return () => clearInterval(interval);
        } else if (!activityStarted) {
            console.log('activity tracking is paused');
        }
    }, [activityStarted]);

    return (
        <View style={styles.container}>
            <Button title='Start Activity' onPress={() => setActivityStarted(true)} />
            <Button title='Stop Activity' onPress={() => setActivityStarted(false)} />
            <Button
                title="View activity"
                onPress={() => {
                    // setActivityStarted(false);
                    navigation.navigate('Activity', { data: coordinatesArray });
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})