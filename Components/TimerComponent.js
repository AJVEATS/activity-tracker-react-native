/**
 * @fileoverview This file represets the TimerComponent which displays the activities current time
 * duration of the activity in the format of '00:00:00'.
 * 
 * @param navigation - For navigation
 */
import { StyleSheet, Text, View } from 'react-native';
import colors from '../colors';
import React from 'react';

const TimerComponent = (data) => {
    const time = data.time;
    let status = data.show;
    // console.log(data.time);

    const pad = (n) => (n < 10 ? `0${n}` : n);

    return (
        <View style={[styles.timerContainer, { display: status }]}>
            <Text style={styles.timerNumbers}>
                {pad(Math.floor(time / 3600))}:
                {pad(Math.floor(time / 60))}:
                {pad(time % 60)}
            </Text>
        </View>
    )
}

export default TimerComponent

const styles = StyleSheet.create({
    timerContainer: {
        width: '90%',
        padding: 20,
        marginBottom: 10,
        backgroundColor: colors.transparentBlack,
        borderRadius: 4,
    },
    timerNumbers: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 46,
    },
})