import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';

const ActivityScreen = (item) => {
    // console.log(`${Object.keys(item.route.params.data).length} coordinates passed in`);

    const activityRegion = {
        latitude: item.route.params.data[0]['latitude'],
        longitude: item.route.params.data[0]['longitude'],
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    }

    console.log(item.route.params.data[0]['latitude']);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={activityRegion}
            >
                <Marker
                    key={'start'}
                    coordinate={item.route.params.data[0]}
                >
                    <Callout
                        style={styles.mapCallout}
                        tooltip={true}
                    >
                        <View style={styles.markerView}>
                            <Text style={styles.markerTitle}>{item.route.params.activityInfo}</Text>
                        </View>
                    </Callout>
                </Marker>
                <Polyline
                    coordinates={item.route.params.data}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                        '#7F0000',
                        '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                    ]}
                    strokeWidth={3}
                />
            </MapView>
        </View>
    );
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
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
});