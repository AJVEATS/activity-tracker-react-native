/**
 * @fileoverview This file represets the FullScreenMapScreen which is a full screen MapView displaying the tracked
 * activities route with a poly line plus a marker for the activities start and end.
 * 
 * The user is able to change the map's style by pressing the the touchable button in the bottom right of the screen.
 * The map will change between the standard, satellite, hybrid and terrain style.
 * 
 * This screen uses the BackButtonComponent for a back button to get back to the previous screen. It also uses the 
 * FullScreenMapComponent to display the full screen map.
 * 
 * @param {Object} item - An object that contains the activity's region and poly line track
 */
import FullScreenMapComponent from '../Components/FullScreenMapComponent';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import colors from '../colors';

const FullScreenMap = (item) => {
    const [mapStyle, setMapStyle] = useState('standard');

    const activityTrack = item.route.params.activityTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;
    const region = item.route.params.activityRegion;

    // console.log(item); // For Testing
    // console.log(activity); // For Testing
    // console.log(activityTrack); // For Testing

    /**
     * This changes the mapStyle useState variable. This allows for the MapView's style to changed on button press.
     * The map will change between the standard, satellite, hybrid and terrain style.
     */
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