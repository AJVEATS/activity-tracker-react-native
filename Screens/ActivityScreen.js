import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { getDistance } from 'geolib';
import colors from '../colors';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment/moment';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import { useNavigation } from '@react-navigation/native';


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ActivityScreen = (item) => {
    const navigation = useNavigation();
    const [notes, onChangeNotes] = useState(null);
    const [userID, setUserID] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUserID(uid);
            const email = user.email;
            setUserEmail(email);
            // console.log(`user ID is - ${uid}`);
            // console.log(`email is - ${email}`);
        } else {
            // User is signed out
        }
    });

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

        return formattedDistance;
    }

    // console.log(activityTrack); // For Testing
    // console.log(polyLineTrack); // For Testing
    // console.log(activity); // For Testing
    // console.log(activityRegion); // For Testing
    // console.log(calculateActivityDistance()); // For Testing
    // console.log(notes); // For Testing

    const discardActivity = () => {
        // console.log('Discard activity pressed');
        navigation.goBack();
    }

    const saveActivity = () => {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getFirestore(app);

        try {
            activity.uid = userID;

            if (notes != null) {
                activity.notes = notes;
            }

            const collectionRef = doc(db, 'activities', `${userID}:${moment().format('YYYY-MM-DD hh:mm:ss')}`);
            setDoc(collectionRef, activity, { merge: true });
            navigation.goBack();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // console.log('Save activity pressed');
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <ActivityMapPreviewComponent activityTrack={activityTrack} polyLineTrack={polyLineTrack} />

            <View style={styles.activityContainer}>
                <ActivityInfoComponent
                    activityInfo={activity}
                    activityDistance={calculateActivityDistance()} />
                <OpenWeatherMapAPI
                    lat={activityTrack[0]['latitude']}
                    lon={activityTrack[0]['longitude']} />
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
                        color='#a83232'
                        title='Discard Activity'
                        onPress={() => {
                            discardActivity();
                        }} />
                    <Button
                        style={styles.buttons}
                        color='#a83232'
                        title='Save Activity'
                        onPress={() => {
                            saveActivity();
                        }} />
                </View>
            </View>
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
        padding: 20,
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
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});