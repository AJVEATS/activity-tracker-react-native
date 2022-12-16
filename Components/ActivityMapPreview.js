import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import colors from '../colors';
import { useNavigation } from '@react-navigation/native';

const ActivityMapPreview = (data) => {

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
                loadingEnabled={true}>
                <Marker
                    key={'start'}
                    coordinate={activityTrack[0]}>
                </Marker>
                <Marker
                    key={'end'}
                    coordinate={activityTrack[lastCoordinate]}></Marker>
                <Polyline
                    coordinates={polyLineTrack}
                    strokeColor={colors.black} // fallback for when `strokeColors` is not supported by the map-provider
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
        </TouchableOpacity>
    )
}

export default ActivityMapPreview

const styles = StyleSheet.create({
    mapViewContainer: {
        overflow: 'hidden',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    map: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
})