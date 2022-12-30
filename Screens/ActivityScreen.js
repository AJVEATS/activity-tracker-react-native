import { Button, Keyboard, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { getDistance } from 'geolib';
import moment from 'moment/moment';
import colors from '../colors';

import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import BackButtonComponent from '../Components/BackButtonComponent';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import ActivityAltitudeChartComponent from '../Components/ActivityAltitudeChartComponent';

const ActivityScreen = (item) => {
    const navigation = useNavigation();
    const [notes, onChangeNotes] = useState(null);
    const [activityWeather, setActivityWeather] = useState([]);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const user = (auth.currentUser);
    const userID = user.uid;

    const activity = item.route.params.activityData;
    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    const calculateActivityDistance = () => {

        let distance = 0;

        for (let i = 0; i < (Object.keys(activityTrack).length); i++) {
            if (i + 1 < (Object.keys(activityTrack).length)) {
                distance = distance + getDistance(activityTrack[i], activityTrack[i + 1]);
            }
        }

        let formattedDistance = '';

        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`;
        } else if (distance <= 1000) {
            formattedDistance = `${distance}m`;
        }

        activity.distance = formattedDistance;

        return formattedDistance;
    };

    const calculateActivityDuration = (start, end) => {
        const duration = moment.duration(moment(start).diff(moment(end)));
        const activityDuration = {
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };

        let formattedTime = '';

        if (activityDuration.hours == 0 && activityDuration.minutes != 0) {
            formattedTime = `${activityDuration.minutes}m ${activityDuration.seconds}s`;
        } else if (activityDuration.minutes == 0) {
            formattedTime = `${activityDuration.seconds}s`;
        } else {
            formattedTime = `${activityDuration.hours}h ${activityDuration.minutes}m ${activityDuration.seconds}s`;
        }

        activity.time = formattedTime;

        return activityDuration;
    };

    const calculateAltitudeGained = () => {
        let gain = 0;

        // activity.altitude = [
        //     { "x": 0, "y": 0 },
        //     { "x": 1, "y": 2 },
        //     { "x": 2, "y": 10 },
        //     { "x": 3, "y": 3 },
        //     { "x": 4, "y": 10 },
        //     { "x": 5, "y": 0 },
        //     { "x": 6, "y": 0 },
        //     { "x": 7, "y": 0 },
        //     { "x": 8, "y": 0 },
        //     { "x": 9, "y": 0 }
        // ]; // For Testing

        for (let i = 1; i < activity.altitude.length; i++) {
            if (activity.altitude[i]['y'] > activity.altitude[i - 1]['y']) {
                gain += activity.altitude[i]['y'] - activity.altitude[i - 1]['y'];
            }
        }
        // console.log(`altitude gained ${gain}`); // For Testing

        activity.altitudeGain = `${gain.toFixed(2)}m`;

        return gain;
    };

    const getActivityWeather = (temperature, condition, location) => {
        // console.log(`temp: ${temperature} condition: ${condition} location ${location}`);    // For Testing
        activityWeather.push({ temperature: temperature, condition: condition });
        activity.location = location;
        activity.weather = activityWeather;
        return null;
    };

    const activityTime = calculateActivityDuration(activity.endTime, activity.start);

    const activityGain = calculateAltitudeGained();

    // console.log(activityTrack); // For Testing
    // console.log(polyLineTrack); // For Testing
    // console.log(activity); // For Testing
    // console.log(activityRegion); // For Testing
    // console.log(calculateActivityDistance()); // For Testing
    // console.log(notes); // For Testing
    // console.log(activityTime); // For Testing
    // console.log(calculateAltitudeGain()); // For Testing

    const discardActivity = () => {
        // console.log('Discard activity pressed'); // For Testing
        navigation.goBack();
    };

    const saveActivity = () => {
        // console.log('Save activity pressed'); // For Testing
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getFirestore(app);

        try {
            activity.uid = userID;

            if (notes != null) {
                activity.notes = notes;
            }

            delete activity.endTime;

            const collectionRef = doc(db, 'activities', `${userID}:${moment().format('YYYY-MM-DD hh:mm:ss')}`);
            setDoc(collectionRef, activity, { merge: true });
            navigation.goBack();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <ScrollView>
                <ActivityMapPreviewComponent activityTrack={activityTrack} polyLineTrack={polyLineTrack} />
                <View style={styles.activityContainer}>
                    <ActivityInfoComponent
                        activityInfo={activity}
                        activityDistance={calculateActivityDistance()} />
                    <OpenWeatherMapAPI
                        lat={activityTrack[0]['latitude']}
                        lon={activityTrack[0]['longitude']}
                        setWeather={getActivityWeather} />
                    <ActivityAltitudeChartComponent
                        altitude={activity.altitude} />
                    <View style={styles.notesContainer}>
                        <TextInput
                            style={styles.notes}
                            onChangeText={onChangeNotes}
                            placeholder={'Notes'}
                            value={notes}
                            onSubmitEditing={Keyboard.dismiss}
                            textAlignVertical={'top'} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.buttons}
                            color={colors.black}
                            title='Discard Activity'
                            onPress={() => {
                                discardActivity();
                            }} />
                        <Button
                            style={styles.buttons}
                            color={colors.black}
                            title='Save Activity'
                            onPress={() => {
                                saveActivity();
                            }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    activityContainer: {
        width: '100%',
        // padding: 20,
        backgroundColor: colors.white,
    },
    activityInfo: {
        width: '100%',
        paddingTop: 15,
    },
    activityName: {
        fontSize: 22,
        marginBottom: 10,
    },
    notes: {
        backgroundColor: colors.white,
        height: 100,
        elevation: 5,
        marginBottom: 10,
        borderRadius: 4,
        padding: 5,
        marginHorizontal: 10,
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
});