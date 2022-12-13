import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Callout, Marker, Polyline } from 'react-native-maps'
import BackButtonComponent from '../Components/BackButtonComponent'

const FullScreenMap = (item) => {

    const activity = item.route.params.activityData;
    const region = item.route.params.activityRegion;

    return (
        <SafeAreaView>
            <BackButtonComponent />
            <MapView
                style={styles.map}
                initialRegion={region}
                loadingEnabled={true}>
                <Marker
                    key={'start'}
                    coordinate={activity.route[0]}>
                    <Callout
                        style={styles.mapCallout}
                        tooltip={true}>
                        <View style={styles.markerView}>
                            <Text style={styles.markerTitle}>Start</Text>
                        </View>
                    </Callout>
                </Marker>
                <Polyline
                    coordinates={activity.route}
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

export default FullScreenMap

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1,
    },
})