import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButtonComponent from '../Components/BackButtonComponent';
import FullScreenMapComponent from '../Components/FullScreenMapComponent';
import colors from '../colors';

const FullScreenMap = (item) => {
    const [mapStyle, setMapStyle] = useState('standard');

    const activityTrack = item.route.params.activityTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;
    const region = item.route.params.activityRegion;

    // console.log(item); // For Testing
    // console.log(activity); // For Testing
    // console.log(activityTrack); // For Testing

    const changeMapStyle = () => {
        // console.log('change map style function'); // For Testing
        if (mapStyle === 'standard') {
            setMapStyle('satellite');
        } else if (mapStyle === 'satellite') {
            setMapStyle('hybrid');
        } else if (mapStyle === 'hybrid') {
            setMapStyle('terrain');
        } else if (mapStyle === 'terrain') {
            setMapStyle('standard');
        }
    }

    return (
        <SafeAreaView>
            <BackButtonComponent />
            <FullScreenMapComponent region={region} activityTrack={activityTrack} mapStyle={mapStyle} />
            <TouchableOpacity
                style={styles.changeMapButton}
                onPress={() => {
                    changeMapStyle();
                }} >
                <Ionicons name={"color-palette-outline"} size={32} color={colors.black} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default FullScreenMap

const styles = StyleSheet.create({
    changeMapButton: {
        position: 'absolute',
        bottom: 70,
        right: 15,
        padding: 10,
        borderRadius: 10,
        zIndex: 100,
        backgroundColor: colors.white,
    }
})