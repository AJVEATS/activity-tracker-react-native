import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../colors';
import PastActivityCardMapComponent from './PastActivityCardMapComponent';
import { useNavigation } from '@react-navigation/native';
import PastActivityCardInfoComponent from './PastActivityCardInfoComponent';

const PastActivityCardComponent = (data) => {
    const activity = data.activityData;
    const navigation = useNavigation();
    // console.log(activity.name); // For Testing
    // console.log(activity.type); // For Testing

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