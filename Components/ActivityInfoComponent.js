/**
 * @fileoverview This file represets the ActivityInfoComponent which the activities Info. Such as 
 * the activities title, overall distance, elevation gained, activity type and activity location.
 * 
 * @param {Object} data - An object which includes all of the activitie's data.
 */
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';
import React from 'react';
import PastActivityWeatherComponent from './PastActivityWeatherComponent';

const ActivityInfoComponent = (data) => {
    const activity = data.activityInfo;
    // console.log(activity); // For Testing

    const pastActivityWeather = () => {
        if (activity.privacy) {
            return (
                <PastActivityWeatherComponent weather={activity.weather[0]} />
            );
        } else {
            // console.log('This is a new activity and it will use the openWeatherAPI instead'); // For Testing
        }
    }

    return (
        <View style={styles.activityInfoContainer}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <View style={styles.activityStatsContainer}>
                <View style={styles.activityStatsTopRow}>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Distance</Text>
                        </View>
                        <View>
                            <Text style={styles.activityStatsValue}>{activity.distance}</Text>
                        </View>
                    </View>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Elevation Gained</Text>
                        </View>
                        <View>
                            <Text style={styles.activityStatsValue}>{activity.altitudeGain}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.activityStatsBottomRow}>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Activity Type</Text>
                        </View>
                        <View>
                            <Text style={styles.activityStatsValue}>{activity.type}</Text>
                        </View>
                    </View>
                    <View style={styles.activityStat}>
                        <View style={styles.activityStatLabelContainer}>
                            <Text style={styles.activityStatsLabel}>Time</Text>
                        </View>
                        <View>
                            <Text style={styles.activityStatsValue}>{activity.time}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {pastActivityWeather()}
        </View>
    )
}

export default ActivityInfoComponent

const styles = StyleSheet.create({
    activityInfoContainer: {},
    activityName: {
        fontWeight: '700',
        fontSize: 28,
        marginVertical: 10,
        marginHorizontal: '3%',
    },
    activityStatsContainer: {
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
        width: '46%',
        textAlign: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: colors.lesserTransparentBlack,
        borderRadius: 4,
    },
    activityStatLabelContainer: {
        width: '100%',
    },
    activityStatsLabel: {
        textAlign: 'center',
        paddingBottom: 5,
        fontSize: 18,
        color: colors.white,
        fontWeight: '300'
    },
    activityStatsValue: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
    },
    activityInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    activityLabel: {
        fontWeight: 'bold',
    },
    weatherContainer: {
        marginHorizontal: '2.7%',
        backgroundColor: colors.lesserTransparentBlack,
        borderRadius: 4,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    temp: {
        fontSize: 18,
        color: colors.white,
    },
    condition: {
        fontSize: 18,
        color: colors.white,
        textTransform: 'capitalize',
    },
})