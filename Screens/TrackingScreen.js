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
    const [selectedActivityType, setSelectedActivityType] = useState('Walk');
    const [activityStartTime, setActivityStartTime] = useState('');
    const [time, setTime] = useState(0);

    useEffect(() => {

        const clearActivity = navigation.addListener("focus", () => {
            onChangeActivityName('');
            setCoordinatesArray([]);
            setAltitudeArray([]);
            setActivityStartTime('');
            setTime(0);
        })

        if (activityStarted) {
            // console.log('activity tracking has started'); // For Testing
            setShowStartActivity(true);
            setShowStopActivity(false);

            const interval = setInterval(() => {
                setTime(time => time + 1);
                (async () => {

                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        setErrorMsg('Permission to access location was denied');
                        return;
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    setLocation(location);
                    coordinatesArray.push({ latitude: location['coords']['latitude'], longitude: location['coords']['longitude'] });
                    altitudeArray.push({ x: time, y: location['coords']['altitude'] });
                    // console.log(coordinatesArray); // For Testing
                    // console.log(altitudeArray); // For Testing
                })();
            }, 1000);
            return () => clearInterval(interval);

        } else if (!activityStarted) {
            // console.log('activity tracking has stopped'); // For Testing
        }
    }, [activityStarted, navigation, time]);

    const formatName = (name, activity) => {
        if (name == '') {
            // console.log(name);  // For Testing
            // console.log(activity);  // For Testing
            if (activity === 'Walk') {
                return `Walk - ${moment().format('DD.MM.YYYY')} 🚶`;
            } else if (activity === 'Hike') {
                return `Hike - ${moment().format('DD.MM.YYYY')} 🥾`;
            } else if (activity === 'Cycle') {
                return `Ride - ${moment().format('DD.MM.YYYY')} 🚴`;
            } else if (activity === 'Run') {
                return `Run - ${moment().format('DD.MM.YYYY')} 🏃`;
            } else if (activity === 'Mountain Biking') {
                return `Ride - ${moment().format('DD.MM.YYYY')} 🚵`;
            }
        }
        return name;
    }

    const endActivity = () => {
        // console.log('end activity initiated'); // For Testing
        if (coordinatesArray.length > 0) {
            setActivityStarted(false);
            setShowStartActivity(false);
            setShowStopActivity(true);

            const activitydata = {
                name: formatName(activityName, selectedActivityType),
                date: moment().format('ll'),
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
                    <Picker.Item label='Walk' value='Walk' />
                    <Picker.Item label='Run' value='Run' />
                    <Picker.Item label='Cycle' value='Cycle' />
                    <Picker.Item label='Mountain Biking' value='Mountain Biking' />
                    <Picker.Item label='Hike' value='Hike' />
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
            {/* <Text>{time}</Text> */}
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