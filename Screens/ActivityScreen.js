/**
 * @fileoverview This file represets the ActivityScreen, which is where a user is taken to
 * after recording an activity. They are able to see the activities data, information and
 * statistics. This screen calculates many statistics about the activity such as the overall
 * distance, activity duration and altitude gained.
 * 
 * Users are able to add notes about the activity. There are also  buttons to discard and save 
 * the activity. DIscarding the activity will delete the activity and return the user to the
 * tracking page. Saving the activity will save the activity in the firebase firestore
 * 'activities' collection as a document.
 * 
 * This screen uses these components:
 *  - ActivityMapPreviewComponent
 *  - ActivityInfoComponent
 *  - ActivityAltitudeChartComponent
 *  - BackButtonComponent
 *  - OpenWeatherMapAPI
 * 
 * @param {Object} item - An object containing the activities information and data
 */
import { Keyboard, ScrollView, StyleSheet, Switch, TextInput, View, Text, Pressable } from 'react-native';
import ActivityAltitudeChartComponent from '../Components/ActivityAltitudeChartComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { getDistance } from 'geolib';
import moment from 'moment/moment';
import colors from '../colors';

const ActivityScreen = (item) => {
    const navigation = useNavigation();
    const [notes, onChangeNotes] = useState(null);
    const [activityWeather, setActivityWeather] = useState([]);
    const [legacyStats, setLegacyStats] = useState([]);
    const [publicStatus, setPublic] = useState(false);
    const toggleSwitch = () => setPublic(previousState => !previousState);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const user = (auth.currentUser);
    const userID = user.uid;

    const newStats = {};

    const activity = item.route.params.activityData;
    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    /**
     * This function calculates the total distance covered in the activity. The distance is 
     * then formatted depending on the activitiy's length and then added to the activity
     * object.
     */
    const calculateActivityDistance = () => {

        let distance = 0;

        for (let i = 0; i < (Object.keys(activityTrack).length); i++) {
            if (i + 1 < (Object.keys(activityTrack).length)) {
                distance = distance + getDistance(activityTrack[i], activityTrack[i + 1]);
            }
        }

        newStats.distance = distance;
        // console.log(newStats.distance); // For Testing

        let formattedDistance = '';

        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`;
        } else if (distance <= 1000) {
            formattedDistance = `${distance}m`;
        }

        activity.distance = formattedDistance;

        return formattedDistance;
    };

    /**
     * @param {start} The activity's start time
     * @param {end} The activity's end time
     * 
     * This function calculates the length of the activity(time) using the recorded start and 
     * end time. The time is then formatted and added the activity object.
     */
    const calculateActivityDuration = (start, end) => {
        const duration = moment.duration(moment(start).diff(moment(end)));
        const activityDuration = {
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
        };

        newStats.duration = activityDuration;
        // console.log(newStats.duration); // For Testing

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

    /**
     * This function calculates the total altitude gained during the activity. It is then
     * formatted and added to the activity object.
     */
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
        newStats.gain = gain.toFixed(2);
        // console.log(newStats.gain); // For Testing
        activity.altitudeGain = `${gain.toFixed(2)}m`;

        return gain;
    };

    /**
     * @param {temperature} The activity's location temperature
     * @param {condition} The activity's location condition
     * @param {location} The activity's location location
     * 
     * This function uses the OpenWeatherMapAPI to set the useState variables for the activities locations
     * weather condition, temperature and location. The new variables are then added the activity object.
     */
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
    // console.log(publicStatus); // For Testing

    /**
     * This function navigates the user back to the track activity screen.
     */
    const discardActivity = () => {
        // console.log('Discard activity pressed'); // For Testing
        navigation.goBack();
    };

    /**
     * This function gets the user's all time stats and adds this activities stats to the 
     * all time stats. The all time stats are then updated in the firebase firestore collection
     * 'legacyStats' 
     */
    async function updatingLegacyStats() {
        const getLegacyStatsRef = doc(db, 'legacyStats', userID);
        const docSnap = await getDoc(getLegacyStatsRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            setLegacyStats(docSnap.data());
            console.log(docSnap.data().totalDuration.hours);

            if ((Number(docSnap.data().totalDuration.minutes) + Number(newStats.duration.minutes)) > 60) {
                newStats.duration.hours = newStats.duration.hours + 1;
                newStats.duration.minutes = newStats.duration.minutes - 60;
            }

            if ((Number(docSnap.data().totalDuration.seconds) + Number(newStats.duration.seconds)) > 60) {
                newStats.duration.minutes = newStats.duration.minutes + 1;
                newStats.duration.seconds = newStats.duration.seconds - 60;
            }

            const updateLegacyStats = {
                totalDistance: Number(docSnap.data().totalDistance) + Number(newStats.distance),
                totalDuration: {
                    hours: Number(docSnap.data().totalDuration.hours) + Number(newStats.duration.hours),
                    minutes: Number(docSnap.data().totalDuration.minutes) + Number(newStats.duration.minutes),
                    seconds: Number(docSnap.data().totalDuration.seconds) + Number(newStats.duration.seconds),
                },
                totalGain: Number(docSnap.data().totalGain) + Number(newStats.gain),
            }

            const legacyCollectionRef = doc(db, 'legacyStats', userID);
            setDoc(legacyCollectionRef, updateLegacyStats, { merge: true });
        } else {
            console.log("No such document!");
        }
    };

    /**
     * This function saves the activty object as a document to the 'activities' collection
     * from firebase firestore. Once the activity is saved the user is redirected to the track activity screen.
     */
    const saveActivity = () => {
        // console.log('Save activity pressed'); // For Testing

        try {
            activity.uid = userID;

            if (notes != null) {
                activity.notes = notes;
            }

            if (publicStatus) {
                activity.privacy = 'public';
            } else {
                activity.privacy = 'private';
            }

            const collectionRef = doc(db, 'activities', `${userID}:${activity.endTime}`);

            // delete activity.endTime;
            setDoc(collectionRef, activity, { merge: true });

            updatingLegacyStats();

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
                            textAlignVertical={'top'}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>Make Activity Public</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={publicStatus ? colors.black : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={publicStatus}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={styles.activityButton}
                            accessibilityLabel='Delete Activity'
                            onPress={() => {
                                discardActivity();
                            }}
                        >
                            <Text style={styles.pressableText}>Delete Activity</Text>
                        </Pressable>
                        <Pressable
                            style={styles.activityButton}
                            accessibilityLabel='Save Activity'
                            onPress={() => {
                                saveActivity();
                            }}
                        >
                            <Text style={styles.pressableText}>Save Activity</Text>
                        </Pressable>
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
    switchContainer: {
        marginHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // marginBottom: 10,
    },
    activityButton: {
        backgroundColor: colors.black,
        width: '95%',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});