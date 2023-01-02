/**
 * @fileoverview This file represets the PastActivityCardComponent which renders a card showing information on an
 * activity. Is uses the PastActivityCardInfoComponent to show the activities information and the 
 * PastActivityCardMapComponent to show a mapView preview of the activities route. Each card is a pressable, which
 * will navigate the users to the activies page where there are able to see more information and data about the 
 * activity.
 * 
 * @param {Object} data - An object of the activity's information
 */
import PastActivityCardInfoComponent from './PastActivityCardInfoComponent';
import PastActivityCardMapComponent from './PastActivityCardMapComponent';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
import React from 'react';

const PastActivityCardComponent = (data) => {
    const activity = data.activityData;
    const navigation = useNavigation();
    // console.log(activity); // For Testing

    /**
     * Navigates to the 'PastActivity' screen for the TouchableOpacity onPress. It passes through the data which is an 
     * object containing the activities information.
     * 
     * @param {item} The activities information
     */
    const cardOnPress = () => {
        navigation.push('PastActivity', { data: activity });
    }

    return (
        <TouchableOpacity
            style={styles.activityCard}
            onPress={() => cardOnPress()}>
            <View style={styles.activityCardInfoContainer}>
                {/* <Text style={styles.activityName}>{activity.name}</Text> */}
                <PastActivityCardInfoComponent activity={activity} />
            </View>
            <PastActivityCardMapComponent activityRoute={activity.route} />
        </TouchableOpacity>
    )
}

export default PastActivityCardComponent

const styles = StyleSheet.create({
    activityCard: {
        backgroundColor: colors.white,
        overflow: 'hidden',
        elevation: 5,
        borderRadius: 4,
        marginHorizontal: 10,
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