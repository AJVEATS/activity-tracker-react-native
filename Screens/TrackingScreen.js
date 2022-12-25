import { StyleSheet, Button, TextInput, View, Keyboard, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import moment from 'moment/moment';

export default function TrackingScreen({ navigation }) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordinatesArray, setCoordinatesArray] = useState([]);
    const [altitudeArray, setAltitudeArray] = useState([]);
    const [activityStarted, setActivityStarted] = useState(false);
    const [showStartActivity, setShowStartActivity] = useState(false);
    const [showStopActivity, setShowStopActivity] = useState(true);
    const [activityName, onChangeActivityName] = useState('');
    const [selectedActivityType, setSelectedActivityType] = useState('walk');
    const [activityStartTime, setActivityStartTime] = useState('');

    let altitudeCounter = 0;

    useEffect(() => {

        const clearActivity = navigation.addListener("focus", () => {
            onChangeActivityName('');
            setCoordinatesArray([]);
            setAltitudeArray([]);
            setActivityStartTime('');
        })

        if (activityStarted) {
            // console.log('activity tracking has started');
            setShowStartActivity(true);
            setShowStopActivity(false);
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
                    altitudeArray.push({ x: altitudeCounter, y: location['coords']['altitude'] });
                    altitudeCounter = altitudeCounter + 1;
                    // console.log(coordinatesArray);
                    // console.log(altitudeArray);
                })();
            }, 1500);
            return () => clearInterval(interval);
        } else if (!activityStarted) {
            // console.log('activity tracking has stopped');
        }
    }, [activityStarted, navigation]);

    const formatName = (name, activity) => {

        if (name === '') {
            if (activity === 'walk') {
                return `🚶 Walk - ${moment().format('DD.MM.YYYY')}`;
            } else if (activity === 'hike') {
                return `🥾 Hike - ${moment().format('DD.MM.YYYY')}`;
            } else if (activity === 'cycle') {
                return `🚴 Ride - ${moment().format('DD.MM.YYYY')} `;
            } else if (activity === 'run') {
                return `🏃‍♂️Run - ${moment().format('DD.MM.YYYY')}`;
            } else if (activity === 'mountainBiking') {
                return `🚵 Ride - ${moment().format('DD.MM.YYYY')}`;
            }
        }

        return name;
    }

    const endActivity = () => {
        // console.log('end activity initiated');

        if (coordinatesArray.length > 0) {
            setActivityStarted(false);
            setShowStartActivity(false);
            setShowStopActivity(true);

            const activitydata = {
                name: formatName(activityName, selectedActivityType),
                date: moment().format('YYYY-MM-DD hh:mm:ss'),
                type: selectedActivityType,
                route: coordinatesArray,
                altitude: altitudeArray,
                start: activityStartTime,
                endTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            };

            navigation.push('ActivityScreen', { activityData: activitydata });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.activityInfoContainer}>
                <Text>Track an activity</Text>
                <TextInput
                    onChangeText={onChangeActivityName}
                    placeholder={'Activity Name'}
                    value={activityName}
                    onSubmitEditing={Keyboard.dismiss} />
                <Picker
                    selectedValue={selectedActivityType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedActivityType(itemValue)
                    }>
                    <Picker.Item label='Walk' value='walk' />
                    <Picker.Item label='Run' value='run' />
                    <Picker.Item label='Cycle' value='cycle' />
                    <Picker.Item label='Mountain Biking' value='mountainBiking' />
                    <Picker.Item label='Hike' value='hike' />
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.buttons}
                    color='#a83232'
                    title='Stop Activity'
                    disabled={showStopActivity}
                    onPress={() => {
                        endActivity();
                    }} />
                <Button
                    style={styles.buttons}
                    color='#32a852'
                    title='Start Activity'
                    disabled={showStartActivity}
                    onPress={() => {
                        setActivityStartTime(moment().format('YYYY-MM-DD hh:mm:ss'));
                        setActivityStarted(true);
                        Keyboard.dismiss()
                    }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityInfoContainer: {
        width: '80%',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    buttons: {},
})