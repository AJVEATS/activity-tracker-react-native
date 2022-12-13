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
    // console.log(`${Object.keys(item.route.params.activityData.route).length} coordinates passed in`);
    console.log(item.route.params.activityData.route);

    const navigation = useNavigation();

    const activity = item.route.params.activityData;

    const activityRegion = {
        latitude: activity.route[0]['latitude'],
        longitude: activity.route[0]['longitude'],
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    }

    var dis = getPreciseDistance(
        { latitude: 20.0504188, longitude: 64.4139099 },
        { latitude: 51.528308, longitude: -0.3817765 }
    );

    // console.log(dis);

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <TouchableOpacity style={styles.mapViewContainer}
                onPress={() => { navigation.push('FullScreenMap', { activityData: activity, activityRegion: activityRegion }); }}>
                <MapView
                    style={styles.map}
                    initialRegion={activityRegion}
                    scrollEnabled={false}
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
                        strokeColor={colors.white} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={3} />
                </MapView>
            </TouchableOpacity>
            <View style={styles.activityContainer}>
                <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text>{activity.type}</Text>
                    <Text>{activity.date}</Text>
                    <Text>{activity.start}</Text>
                    <Text>{activity.endTime}</Text>
                </View>
            </View>
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