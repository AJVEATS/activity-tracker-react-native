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

    clock: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    face: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    handContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hand: {
        width: '50%',  // set the width of the hand to half the width of the clock face
        height: 5,
        backgroundColor: 'black',
    },
})