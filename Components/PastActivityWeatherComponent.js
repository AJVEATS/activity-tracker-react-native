/**
 * @fileoverview This file represets the PastActivityWeatherComponent which is for displaying a past activities weather 
 * condition, with data from the firebase firestore database.
 * 
 * @param {Object} data - An object of the activities weather.
 */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../colors';

const PastActivityWeatherComponent = (data) => {
    const weather = data.weather;
    // console.log(weather);   // For Testing
    return (
        <View style={styles.weatherContainer}>
            <Text style={styles.temp}>{`${weather.temperature}°C - `}</Text>
            <Text style={styles.condition}>{weather.condition}</Text>
        </View>
    )
}

export default PastActivityWeatherComponent

const styles = StyleSheet.create({
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