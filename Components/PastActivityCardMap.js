import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import colors from '../colors';

const PastActivityCardMap = (data) => {
    const activityRoute = data.activityRoute;

    const activityRegion = {
        latitude: activityRoute[0]['latitude'],
        longitude: activityRoute[0]['longitude'],
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={activityRegion}
            scrollEnabled={false}
            loadingEnabled={true}>
            <Marker
                key={'start'}
                coordinate={activityRoute[0]} />
            <Marker
                key={'end'}
                coordinate={activityRoute[Object.keys(activityRoute).length - 1]} />
            <Polyline
                coordinates={activityRoute}
                strokeColor={colors.black}
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={3} />
        </MapView>
    )
}

export default PastActivityCardMap

const styles = StyleSheet.create({
    map: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
})