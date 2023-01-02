/**
 * @fileoverview This file represets the ActivityMapPreviewComponent which renders a small MapView
 * to show the activities route, start and finish. Clicking on the mapView will navigation the the 
 * FullScreenMap.
 * 
 * @param {Object} data - An object containing the polyLineTrack for the PolyLine and an array of 
 * the activities coordinates.
 * 
 */
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
import React from 'react';

const ActivityMapPreviewComponent = (data) => {

    const navigation = useNavigation();
    const activityTrack = data.activityTrack;
    const polyLineTrack = data.polyLineTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;

    const activityRegion = {
        latitude: activityTrack[0]['latitude'],
        longitude: activityTrack[0]['longitude'],
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    return (
        <TouchableOpacity style={styles.mapViewContainer}
            onPress={() => { navigation.push('FullScreenMap', { activityRegion: activityRegion, activityTrack: polyLineTrack }); }}>
            <MapView
                style={styles.map}
                initialRegion={activityRegion}
                scrollEnabled={false}
                loadingEnabled={true}
            >
                <Marker
                    key={'start'}
                    coordinate={activityTrack[0]}
                />
                <Marker
                    key={'end'}
                    coordinate={activityTrack[lastCoordinate]}
                />
                <Polyline
                    coordinates={polyLineTrack}
                    strokeColor={colors.black}
                    strokeWidth={3}
                />
            </MapView>
        </TouchableOpacity>
    )
}

export default ActivityMapPreviewComponent

const styles = StyleSheet.create({
    mapViewContainer: {
        overflow: 'hidden',
        borderBottomEndRadius: 6,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    map: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
})