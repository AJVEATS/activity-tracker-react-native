import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import BackButtonComponent from '../Components/BackButtonComponent';
import FullScreenMapComponent from '../Components/FullScreenMapComponent';

const FullScreenMap = (item) => {
    const activityTrack = item.route.params.activityTrack;
    const lastCoordinate = Object.keys(activityTrack).length - 1;
    const region = item.route.params.activityRegion;

    console.log('#################  Full Screen  #################');
    // console.log(item); // For Testing
    // console.log(activity); // For Testing
    // console.log(activityTrack); // For Testing

    return (
        <SafeAreaView>
            <BackButtonComponent />
            <FullScreenMapComponent region={region} activityTrack={activityTrack} />
        </SafeAreaView>
    )
}

export default FullScreenMap

const styles = StyleSheet.create({})