/**
 * @fileoverview This file represets the LegacyStatsComponent which displays the user's all time
 * stats for distance, duration and altitude
 */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './FirebaseAuthComponent';
import colors from '../colors';

const LegacyStatsComponent = () => {
    const [distance, setDistance] = useState('0');
    const [gain, setGain] = useState('0');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    // The user currently logged in with firebase authentication
    const user = (auth.currentUser);


    /**
     * This function gets the user's legacy stats document stored in the 'legacyStats' collection
     * from the firebase firestore.
     * 
     * If the user has no set legacy stats a message is output to console informing that 
     * there is no document.
     * 
     * If the user does have a legacy stats document, the use state values are then updated with 
     * the store legacy stats.
     */
    async function getLegacyStats() {

        const legacyStatRef = doc(db, 'legacyStats', user.uid);
        const docSnap = await getDoc(legacyStatRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setDistance(docSnap.data().totalDistance);
            setGain(docSnap.data().totalGain);
            setHours(docSnap.data().totalDuration.hours);
            setMinutes(docSnap.data().totalDuration.minutes)
            setSeconds(docSnap.data().totalDuration.seconds)
            // setUserLastname(docSnap.data().lastname);
        } else {
            console.log("No such document!");
        }
    };

    getLegacyStats();

    /**
     * This function formats the user's legacy distance to be in meters if the number is below 1,000m
     * and if the value is above 1,000 the value is converted to km.
     * 
     * @param {distance} The user's legacy distance from firebase firestore 'legacyStats' Collection
     */
    const formatDistance = (distance) => {
        let formattedDistance = '';

        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`;
        } else if (distance <= 1000) {
            formattedDistance = `${distance}m`;
        }

        return formattedDistance;
    };

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>All Time Stats:</Text>
            <Text style={styles.stats}>
                <Text style={styles.label}>Distance: </Text>
                <Text style={styles.stats}>{formatDistance(distance)}</Text>
            </Text>
            <Text style={styles.stats}>
                <Text style={styles.label}>Total Time: </Text>
                <Text style={styles.stats}>{`${hours}:${minutes}:${seconds}`}</Text>
            </Text>
            <Text style={styles.stats}>
                <Text style={styles.label}>Elevation: </Text>
                <Text style={styles.stats}>{`+${Number(gain).toFixed(2)}m`}</Text>
            </Text>
        </View>
    )
}

export default LegacyStatsComponent

const styles = StyleSheet.create({
    statsContainer: {
        backgroundColor: colors.lesserTransparentBlack,
        borderRadius: 4,
        padding: 10,
        marginHorizontal: '5%',
        marginBottom: 10,
    },
    statsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 10,
    },
    stats: {
        fontSize: 18,
        marginBottom: 5,
        color: colors.white,
    },
    label: {
        fontWeight: 'bold',
    }
})