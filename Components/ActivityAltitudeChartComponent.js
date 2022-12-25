import { StyleSheet, Text, View } from 'react-native';
import { VictoryLine, VictoryChart } from 'victory-native';
import React from 'react'
import colors from '../colors';

const ActivityAltitudeChartComponent = (data) => {
    // console.log(data.altitude);

    return (
        <View style={styles.ActivityAltitudeChartComponent}>
            <VictoryChart
                style={styles.VictoryChart}>
                <VictoryLine
                    data={data.altitude}
                    stoke={colors.black}
                    strokeWidth={2} />
            </VictoryChart>
        </View>
    )
}

export default ActivityAltitudeChartComponent

const styles = StyleSheet.create({

})