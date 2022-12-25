import { StyleSheet, Text, View } from 'react-native';
import { VictoryLine, VictoryChart } from 'victory-native';
import React from 'react'
import colors from '../colors';

const ActivityAltitudeChartComponent = (data) => {
    // console.log(data.altitude);

    const test = [{ "x": 0, "y": 76.0999984741211 }, { "x": 1, "y": 76.0999984741211 }, { "x": 2, "y": 76.0999984741211 }, { "x": 3, "y": 76.4000015258789 }, { "x": 4, "y": 76.4000015258789 }, { "x": 5, "y": 76.4000015258789 }, { "x": 6, "y": 77.5999984741211 }, { "x": 7, "y": 77.80000305175781 }, { "x": 8, "y": 77.80000305175781 }, { "x": 9, "y": 76.4000015258789 }, { "x": 10, "y": 76.4000015258789 }, { "x": 11, "y": 77.80000305175781 }, { "x": 12, "y": 77.5999984741211 }, { "x": 13, "y": 77.5999984741211 }, { "x": 14, "y": 77.80000305175781 }];

    return (
        <View style={styles.activityAltitudeChartComponent}>
            <VictoryChart
                style={styles.victoryChart}>
                <VictoryLine
                    // data={data.altitude}
                    data={test}
                    stoke={colors.black}
                    interpolation={'monotoneX'}
                    strokeWidth={2} />
            </VictoryChart>
        </View>
    )
}

export default ActivityAltitudeChartComponent

const styles = StyleSheet.create({
    activityAltitudeChartComponent: {
        // backgroundColor: 'blue',
    },
    victoryChart: {
        backgroundColor: 'white',
    }
})