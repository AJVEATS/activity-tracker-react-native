/**
 * @fileoverview This file represets the FullScreenMapComponent which displays a full screen
 * MapView with the activities route as well as a marker for the start and finish.
 * 
 * @param {Object} data - An object containing the activitiy's region, the activity's track and the map style 
 * 
 */
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const FullScreenMapComponent = (data) => {

    const activityTrack = data.activityTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;
    const region = data.region;
    let mapStyle = data.mapStyle

    // console.log(activityTrack); // For Testing
    // console.log(region); // For Testing

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            loadingEnabled={true}
            showsCompass={false}
            showsScale={true}
            mapType={mapStyle}>
            <Marker
                key={'start'}
                coordinate={activityTrack[0]}>
                <Callout
                    style={styles.mapCallout}
                    tooltip={true}>
                    <View style={styles.markerView}>
                        <Text style={styles.markerTitle}>Start</Text>
                    </View>
                </Callout>
            </Marker>
            <Marker
                key={'end'}
                coordinate={activityTrack[lastCoordinate]}>
                <Callout
                    style={styles.mapCallout}
                    tooltip={true}>
                    <View style={styles.markerView}>
                        <Text style={styles.markerTitle}>Finish</Text>
                    </View>
                </Callout>
            </Marker>
            <Polyline
                coordinates={activityTrack}
                strokeColor="#000"
                strokeWidth={3} />
        </MapView>
    )
}

export default FullScreenMapComponent

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1,
    },
    mapCallout: {
        backgroundColor: 'transparent',
        width: 200,
    },
    markerView: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 5,
        borderStyle: 'solid',
        padding: 10,
        flex: 1,
    },
    markerTitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 10
    },
})