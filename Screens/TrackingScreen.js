/**
 * @fileoverview This file represets the TrackingScreen which is where the user is able to record
 * an activity, set the activity's name and the activity type.
 * 
 * When a user pressess the 'start activity' button it will record the users current location (lat,
 * lon coordinates), and their current altitude level. It will only track the user's location if the
 * user has allowed the location tracking permission.
 * 
 * When the 'stop activity' button is pressed the activity will stop recording and the activity's 
 * information will be packaged into an object and passed through navigation intto the 'ActivityScreen'.
 * If the user has not entered anything into the activity name, a formatted name made up of the date and 
 * activity type will be used.
 * 
 * Every time this screen is in focus the useState of all of the activity variables will be reset to allow 
 * a new activty to be recorded.
 * 
 * @param navigation - For navigation
 */
import { StyleSheet, Button, TextInput, View, Keyboard, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import moment from 'moment/moment';
import colors from '../colors';

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

        /**
        * This resets all of the activity tracking variables when the screen becomes
        * the in focus. This allows for a new activity to be tracked.
        */
        const clearActivity = navigation.addListener("focus", () => {
            onChangeActivityName('');
            setCoordinatesArray([]);
            setAltitudeArray([]);
            setActivityStartTime('');
            setTime(0);
        })

        /**
        * if the 'start activity' button has been pressed and the activityStarted variable 
        * has been set to true the user's current latitude and longtitude coordinates and 
        * their current altitude will be recorded every second. This will only happen if the
        * user allows location permissions.
        */
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

    /**
    * This creates a name for the activity if the user has not set a name. It makes a name with the activity type with the activities
    * timestamp plus an emoji for that activity.
    */
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

    /**
    * This if for when a user has started tracking an activity and has now pressed the 'stop activity' button.
    * First it checks if any coordinates have been recorded, if there are recorded coordinates it will stop 
    * tracking the user's location and altitude.
    * 
    * The activities data in then packaged into and object called 'activitydata'. The user will then be navigated 
    * to the 'ActivityScreen' passing throug the 'activitydata' object to see the tracked activities data in more
    * detail.
    */
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
        <SafeAreaView style={styles.TrackingScreen}>
            <Text style={styles.title}>Track an activity</Text>
            <View style={styles.container}>
                <View style={styles.activityInfoContainer}>
                    {/* <Text>Track an activity</Text> */}
                    <TextInput
                        onChangeText={onChangeActivityName}
                        placeholder={'Click to enter activity name'}
                        value={activityName}
                        placeholderTextColor={colors.white}
                        style={styles.activityName}
                        onSubmitEditing={Keyboard.dismiss} />
                    <Picker
                        style={styles.activityPicker}
                        selectedValue={selectedActivityType}
                        dropdownIconColor={colors.white}
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
            </View>
            {/* <Text>{time}</Text> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    TrackingScreen: {
        // backgroundColor: 'black',
        flex: 1,
    },
    title: {
        fontSize: 24,
        padding: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    activityInfoContainer: {
        width: '90%',
        padding: 20,
        paddingBottom: 10,
        backgroundColor: colors.transparentBlack,
        borderTopStartRadius: 4,
        borderTopEndRadius: 4,
    },
    activityName: {
        fontSize: 20,
        color: colors.white,
    },
    activityPicker: {
        color: colors.white,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        width: '90%',
        paddingBottom: 20,
        backgroundColor: colors.transparentBlack,
        borderBottomStartRadius: 4,
        borderBottomEndRadius: 4,
    },
    buttons: {},
})