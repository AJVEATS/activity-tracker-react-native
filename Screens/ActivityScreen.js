import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Polyline } from 'react-native-maps';

const ActivityScreen = (item) => {
    console.log(`Activity screen data: ${item.route.params.data}`);
    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
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
});