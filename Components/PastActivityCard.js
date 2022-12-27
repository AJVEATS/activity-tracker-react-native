import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../colors';
import ActivityMapPreview from './ActivityMapPreviewComponent';
import PastActivityCardMap from './PastActivityCardMap';

const PastActivityCard = (data) => {
    const activity = data.activityData;
    // console.log(activity.name); // For Testing
    // console.log(activity.type); // For Testing
    return (
        <TouchableOpacity style={styles.activityCard}>
            <View style={styles.activityCardInfoContainer}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text>{activity.location}</Text>
                <View style={styles.activityStatsContainer}>
                    <Text>{activity.distance}</Text>
                    <Text>{activity.altitudeGain}</Text>
                    <Text>{activity.time}</Text>
                </View>
            </View>
            <PastActivityCardMap activityRoute={activity.route} />
        </TouchableOpacity>
    )
}

export default PastActivityCard

const styles = StyleSheet.create({
    activityCard: {
        backgroundColor: colors.white,
        overflow: 'hidden',
        elevation: 5,
        borderRadius: 4,
    },
    activityCardInfoContainer: {
        padding: 10,
    },
    activityName: {
        fontWeight: 'bold',
    },
    activityStatsContainer: {

    },
})