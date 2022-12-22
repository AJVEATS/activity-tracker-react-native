import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ActivityInfoComponent = (data) => {
    const activity = data.activityInfo;

    // console.log(data.activityDistance);

    return (
        <View style={styles.activityInfo}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text>{activity.type}</Text>
            <Text>{activity.start}</Text>
            <Text>{activity.endTime}</Text>
            <Text>{data.activityDistance}</Text>
        </View>
    )
}

export default ActivityInfoComponent

const styles = StyleSheet.create({
    activityName: {
        fontSize: 22,
        marginBottom: 5,
    },
})