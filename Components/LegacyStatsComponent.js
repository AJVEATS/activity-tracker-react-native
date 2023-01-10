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
    const user = (auth.currentUser);

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