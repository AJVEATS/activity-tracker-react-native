import { StyleSheet, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function TrackingScreen() {

    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinatesArray, setCoordinatesArray] = useState([]);
    const [activityStarted, setActivityStarted] = useState(false);
    const [showStopActivity, setShowStopActivity] = useState(true);
    const [activityName, onChangeActivityName] = useState('Activity Name');

    useEffect(() => {
        if (activityStarted) {
            setShowStopActivity(false);
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
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={onChangeActivityName}
                value={activityName} />
            <Button
                style={styles.buttons}
                color='#32a852'
                title='Start Activity'
                onPress={() => setActivityStarted(true)} />
            <Button
                style={styles.buttons}
                color='#a83232'
                title='Stop Activity'
                disabled={showStopActivity}
                onPress={() => {
                    setActivityStarted(false);
                    navigation.push('ActivityScreen', { data: coordinatesArray, activityInfo: activityName });
                }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        width: 200,
    }
})