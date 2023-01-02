/**
 * @fileoverview This file represets the PastActivityCardInfoComponent which displays the activities infomation.
 * It is part of the PastActivityCardComponent showing the activities information as part of the activities card.
 * 
 * @param {Object} data - An object of the activity's information
 */
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';
import React from 'react';

const PastActivityCardInfoComponent = (data) => {
    const activity = data.activity;
    // console.log(activity); // For Testing
    return (
        <View style={styles.activityInfoContainer}>
            <View style={styles.activityInfoTitle}>
                <Text style={styles.activityName}>{activity.name}</Text>
            </View>
            <View style={styles.activityData}>
                <Text style={styles.activityTime}>{activity.date}</Text>
                <Text style={styles.activityLocation}>{activity.location}</Text>
            </View>
            <View style={styles.activityInfoStats}>
                <View style={styles.activityInfoStat}>
                    <Text style={styles.activityInfoStatTitle}>Distance</Text>
                    <Text style={styles.activityInfoStatValue}>{activity.distance}</Text>
                </View>
                <View style={styles.activityInfoStat}>
                    <Text style={styles.activityInfoStatTitle}>Elev</Text>
                    <Text style={styles.activityInfoStatValue}>{activity.altitudeGain}</Text>
                </View>
                <View style={styles.activityInfoStat}>
                    <Text style={styles.activityInfoStatTitle}>Length</Text>
                    <Text style={styles.activityInfoStatValue}>{activity.time}</Text>
                </View>
            </View>
        </View>
    )
}

export default PastActivityCardInfoComponent

const styles = StyleSheet.create({
    activityInfoContainer: {},
    activityInfoTitle: {},
    activityName: {
        fontSize: 24,
    },
    activityData: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 5,
    },
    activityTime: {
        paddingRight: 7,
        borderRightWidth: 1,
        borderColor: colors.black,
        fontSize: 16,
    },
    activityLocation: {
        paddingLeft: 7,
        fontSize: 16,
    },
    activityInfoStats: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    activityInfoStat: {
        width: 80,
    },
    activityInfoStatTitle: {
        fontSize: 16,
    },
    activityInfoStatValue: {
        fontSize: 16,
    },
})