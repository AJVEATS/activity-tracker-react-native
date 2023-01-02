/**
 * @fileoverview This file represets the PastActivityCardMapComponent which renders a map view
 * for that activity, showing the activities route, start and finish within the activities card. 
 * This is part of the PastActivityCardComponent.
 * 
 * @param {Object} data - The activities route's coordinates
 */
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import React from 'react';

const PastActivityCardMap = (data) => {
    const activityRoute = data.activityRoute;
    const activityRegion = {
        latitude: activityRoute[0]['latitude'],
        longitude: activityRoute[0]['longitude'],
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
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