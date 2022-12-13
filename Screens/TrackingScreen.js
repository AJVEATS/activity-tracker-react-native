import { StyleSheet, Button, TextInput, View, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
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

    useEffect(() => {
        // setCoordinatesArray = [];
        if (activityStarted) {
            setShowStartActivity(true);
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
                    altitudeArray.push({ altitude: location['coords']['altitude'] });
                    console.log(coordinatesArray);
                    // console.log(altitudeArray);
                })();
            }, 1500);
            return () => clearInterval(interval);
        } else if (!activityStarted) {
            console.log('activity tracking is paused');
        }
    }, [activityStarted]);

    const formatName = (name, activity) => {
        console.log(activity);
        console.log(name);

        if (name === '') {
            if (activity === 'walk') {
                return `walk - ${moment().format('YYYY-MM-DD hh:mm')}`;
            } else if (activity === 'hike') {
                return `hike - ${moment().format('YYYY-MM-DD hh:mm')}`;
            } else if (activity === 'cycle') {
                return `cycle - ${moment().format('YYYY-MM-DD hh:mm')}`;
            } else if (activity === 'run') {
                return `run - ${moment().format('YYYY-MM-DD hh:mm')}`;
            }
        }

        return name;
    }

    const endActivity = () => {

        let activityData = {
            name: formatName(activityName, selectedActivityType),
            date: moment().format('YYYY-MM-DD hh:mm:ss'),
            type: selectedActivityType,
            route: coordinatesArray,
            altitude: altitudeArray,
        };

        setActivityStarted(false);
        setShowStartActivity(false);
        setShowStopActivity(true);
        navigation.push('ActivityScreen', { activityData: activityData });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.activityInfoContainer}>
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
                    {/* <Picker.Item labal='Hike' value='hike' /> */}
                    <Picker.Item label='Run' value='run' />
                    <Picker.Item label='Cycle' value='cycle' />
                    <Picker.Item label='Hike' value='hike' />
                </Picker>
            </View>
            <Button
                style={styles.buttons}
                color='#32a852'
                title='Start Activity'
                disabled={showStartActivity}
                onPress={() => {
                    setActivityStarted(true)
                    Keyboard.dismiss()
                }} />
            <Button
                style={styles.buttons}
                color='#a83232'
                title='Stop Activity'
                disabled={showStopActivity}
                onPress={() => {
                    endActivity();
                }} />
            <MapView
                style={styles.map} />
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
        width: '100%',
    },
    buttons: {
        width: 200,
    }
})