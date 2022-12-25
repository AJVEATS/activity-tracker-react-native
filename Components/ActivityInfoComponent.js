import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ActivityInfoComponent = (data) => {
    const activity = data.activityInfo;

    // console.log(data.activityDistance);

    const formatTime = (time) => {
        let formattedTime = '';

        if (time.hours == 0 && time.minutes != 0) {
            formattedTime = `${time.minutes}m ${time.seconds}s`;
        } else if (time.minutes == 0) {
            formattedTime = `${time.seconds}s`;
        } else {
            formattedTime = `${time.hours}h ${time.minutes}m ${time.seconds}s`;
        }

        return formattedTime;
    }

    // console.log(formatTime(activity.time)); // For Testing

    return (
        <View style={styles.activityInfoContainer}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text style={styles.activityInfo}><Text style={styles.activityLabel}>Activity type: </Text>{activity.type}</Text>
            <Text style={styles.activityInfo}><Text style={styles.activityLabel}>Activity time: </Text>{formatTime(activity.time)}</Text>
            <Text style={styles.activityInfo}><Text style={styles.activityLabel}>Activity distance: </Text>{data.activityDistance}</Text>
        </View>
    )
}

export default ActivityInfoComponent

const styles = StyleSheet.create({
    activityInfoContainer: {
        // marginBottom: 5,
    },
    activityName: {
        fontSize: 22,
        marginBottom: 5,
    },
    activityInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
    activityLabel: {
        fontWeight: 'bold',
    },
})