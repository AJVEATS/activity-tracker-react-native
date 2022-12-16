import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import { getDistance, getPreciseDistance } from 'geolib';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../colors';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

const ActivityScreen = (item) => {
    const navigation = useNavigation();

    const activity = item.route.params.activityData;
    const lastCoordinate = Object.keys(activity.route).length - 1;

    const activityTrack = activity.route;

    console.log('#########   Activity Screen   #########');
    console.log(activityTrack);
    console.log(typeof (activityTrack));

    const activityRegion = {
        latitude: activity.route[0]['latitude'],
        longitude: activity.route[0]['longitude'],
        // latitude: 37.8025259,
        // longitude: -122.4351431,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);
    // console.log(typeof (myData));

    console.log(polyLineTrack);
    let distance = 0;

    for (let i = 0; i < (Object.keys(activity.route).length); i++) {
        if (i + 1 < (Object.keys(activity.route).length)) {
            distance = getDistance(activity.route[i], activity.route[i + 1]);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <TouchableOpacity style={styles.mapViewContainer}
                onPress={() => { navigation.push('FullScreenMap', { activityRegion: activityRegion, activityTrack: polyLineTrack }); }}>
                <MapView
                    style={styles.map}
                    initialRegion={activityRegion}
                    scrollEnabled={false}
                    loadingEnabled={true}>
                    <Marker
                        key={'start'}
                        coordinate={activity.route[0]}>
                    </Marker>
                    <Marker
                        key={'end'}
                        coordinate={activity.route[lastCoordinate]}></Marker>
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
            {/* <View style={styles.activityContainer}>
                <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text>{activity.type}</Text>
                    <Text>{activity.date}</Text>
                    <Text>{activity.start}</Text>
                    <Text>{activity.endTime}</Text>
                    <Text>{`${distance}m`}</Text>
                </View>
            </View> */}
        </SafeAreaView>
    );
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
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
    activityContainer: {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityInfo: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: colors.white,
    },
    activityName: {
        fontSize: 22,
        marginBottom: 10,
    },
});