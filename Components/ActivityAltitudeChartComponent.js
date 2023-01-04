/**
 * @fileoverview This file represets the ActivityAltitdeComponent which displays a line chart (using victory chart native)
 * to show the user's altitude during their activity as a line chart.
 * 
 * @param {Object} data - An object of the activities altitude and the time stamp for the altitude value.
 * 
 */
import { StyleSheet, View, Text } from 'react-native';
import { VictoryLine, VictoryChart } from 'victory-native';
import React from 'react';
import colors from '../colors';

const ActivityAltitudeChartComponent = (data) => {
    // console.log(data.altitude);
    // const test = [
    //     { "x": 0, "y": 76.0999984741211 },
    //     { "x": 3, "y": 76.4000015258789 },
    //     { "x": 6, "y": 77.5999984741211 },
    //     { "x": 7, "y": 77.80000305175781 },
    //     { "x": 8, "y": 77.80000305175781 },
    //     { "x": 9, "y": 76.4000015258789 },
    //     { "x": 10, "y": 76.4000015258789 },
    //     { "x": 11, "y": 77.80000305175781 },
    //     { "x": 13, "y": 77.5999984741211 },
    //     { "x": 14, "y": 77.80000305175781 }
    // ];  // For Testing

    const minValue = data.altitude.reduce((min, p) => p.y < min ? p.y : min, data.altitude[0].y);
    const maxValue = data.altitude.reduce((max, p) => p.y > max ? p.y : max, data.altitude[0].y);
    const padding = 0.10;

    return (
        <View style={styles.activityAltitudeChartComponent}>
            <Text style={styles.chartTitle}>Altitude Chart</Text>
            <VictoryChart
                padding={{ top: 10, bottom: 40, left: 50, right: 20 }}>
                <VictoryLine
                    data={data.altitude}
                    // data={test} // For Testing
                    stoke={colors.black}
                    interpolation={'monotoneX'}
                    strokeWidth={2}
                    domain={{
                        y: [minValue - (maxValue - minValue) * padding, maxValue + (maxValue - minValue) * padding]
                    }} />
            </VictoryChart>
        </View>
    )
}

export default ActivityAltitudeChartComponent

const styles = StyleSheet.create({
    chartTitle: {
        paddingHorizontal: 10,
        fontSize: 24,
    }
})