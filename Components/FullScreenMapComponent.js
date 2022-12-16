import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const FullScreenMapComponent = (data) => {

    console.log('#################  FullScreenMapComponent  #################');
    const activityTrack = data.activityTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;
    const region = data.region;
    // console.log(activityTrack);
    // console.log(region);
    return (
        <SafeAreaView>
            {/* <Text>FullScreenMapComponent</Text> */}
            <MapView
                style={styles.map}
                initialRegion={region}
                loadingEnabled={true}>
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
                            <Text style={styles.markerTitle}>End</Text>
                        </View>
                    </Callout>
                </Marker>
                <Polyline
                    coordinates={activityTrack}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
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
        </SafeAreaView>
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