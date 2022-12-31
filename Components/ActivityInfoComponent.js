/**
 * @fileoverview This file represets the ActivityInfoComponent which the activities Info. Such as 
 * the activities title, overall distance, elevation gained, activity type and activity location.
 * 
 * @param {Object} data - An object which includes all of the activitie's data.
 * 
 */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ActivityInfoComponent = (data) => {
    const activity = data.activityInfo;
    // console.log(activity); // For Testing

    return (
        <View style={styles.activityInfoContainer}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <View style={styles.activityStatsContainer}>
                <View style={styles.activityStatsTopRow}>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Distance</Text>
                        </View>
                        <View style={styles.activityStatValueConatainer}>
                            <Text style={styles.activityStatValue}>{activity.distance}</Text>
                        </View>
                    </View>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Elevation Gained</Text>
                        </View>
                        <View style={styles.activityStatValueConatainer}>
                            <Text style={styles.activityStatValue}>{activity.altitudeGain}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.activityStatsBottomRow}>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Activity Type</Text>
                        </View>
                        <View style={styles.activityStatValueConatainer}>
                            <Text style={styles.activityStatValue}>{activity.type}</Text>
                        </View>
                    </View>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Location</Text>
                        </View>
                        <View style={styles.activityStatValueConatainer}>
                            <Text style={styles.activityStatValue}>{activity.location}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ActivityInfoComponent

const styles = StyleSheet.create({
    activityInfoContainer: {},
    activityName: {
        fontSize: 24,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    activityStatsContainer: {
        // margin: 5,
        width: '100%',

    },
    activityStatsTopRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    activityStatsBottomRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    activityStat: {
        width: '45%',
        // padding: 10,
        textAlign: 'center',
        marginBottom: 10,
    },
    activityStatLabelContainer: {
        width: '100%',
    },
    activityStatValueConatainer: {
    },
    activityStatsLabel: {
        textAlign: 'center',
        paddingBottom: 5,
    },
    activityStatValue: {
        textAlign: 'center',
    },
    activityInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    activityLabel: {
        fontWeight: 'bold',
    },
})