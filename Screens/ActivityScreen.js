import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';
import { getDistance, getPreciseDistance } from 'geolib';
import { useNavigation } from '@react-navigation/native';

const ActivityScreen = (item) => {
    // console.log(`${Object.keys(item.route.params.activityData.route).length} coordinates passed in`);
    // console.log(item.route.params.activityData);

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
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{activity.name}</Text>
            </View>
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
            </TouchableOpacity>
            <View style={styles.activityInfoContainer}>
                <Text style={styles.activityInfoText}>{activity.type}</Text>
                <Text style={styles.activityInfoText}>{activity.date}</Text>
                {/* <OpenWeatherMapAPI lat={activity.route[0]['latitude']} lon={activity.route[0]['longitude']} /> */}
            </View>
        </View >
    );
}

export default ActivityScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        marginVertical: '5%',
    },
    title: {
        fontSize: 22,
    },
    mapViewContainer: {
        overflow: 'hidden',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    map: {
        width: '90%',
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
    activityInfoContainer: {
        height: 80,
    },
    activityInfoText: {},
});