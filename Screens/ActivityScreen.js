import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import { getDistance, getPreciseDistance } from 'geolib';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../colors';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityMapPreview from '../Components/ActivityMapPreview';

const ActivityScreen = (item) => {

    const activity = item.route.params.activityData;
    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    let distance = 0;

    for (let i = 0; i < (Object.keys(activity.route).length); i++) {
        if (i + 1 < (Object.keys(activity.route).length)) {
            distance = getDistance(activity.route[i], activity.route[i + 1]);
        }
    }

    console.log('#########   Activity Screen   #########');
    // console.log(activityTrack);
    // console.log(polyLineTrack);
    // console.log(activity);
    // console.log(activityRegion);
    // console.log(distance);

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <ActivityMapPreview activityTrack={activityTrack} polyLineTrack={polyLineTrack} />
            <View style={styles.activityContainer}>
                <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text>{activity.type}</Text>
                    <Text>{activity.date}</Text>
                    <Text>{activity.start}</Text>
                    <Text>{activity.endTime}</Text>
                    <Text>{`${distance}m`}</Text>
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
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityInfo: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: colors.white,
    },
    activityName: {
        fontSize: 22,
        marginBottom: 10,
    },
});