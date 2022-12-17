import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { getDistance } from 'geolib';
import colors from '../colors';
import BackButtonComponent from '../Components/BackButtonComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import OpenWeatherMapAPI from '../API/OpenWeatherMapAPI';

const ActivityScreen = (item) => {
    const [notes, onChangeNotes] = useState(null);

    const activity = item.route.params.activityData;
    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    const calculateActivityDistance = () => {

        let distance = 0;

        for (let i = 0; i < (Object.keys(activityTrack).length); i++) {
            if (i + 1 < (Object.keys(activityTrack).length)) {
                distance = distance + getDistance(activityTrack[i], activityTrack[i + 1]);
            }
        }

        let formattedDistance = '';

        if (distance >= 1000) {
            formattedDistance = `${(distance / 1000).toFixed(2)}km`;
        } else if (distance <= 1000) {
            formattedDistance = `${distance}m`;
        }

        return formattedDistance;
    }

    // console.log(activityTrack);
    // console.log(polyLineTrack);
    // console.log(activity);
    // console.log(activityRegion);

    // console.log(notes);

    return (
        <SafeAreaView style={styles.container}>
            <BackButtonComponent />
            <ActivityMapPreviewComponent activityTrack={activityTrack} polyLineTrack={polyLineTrack} />
            <View style={styles.activityContainer}>
                <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text>{activity.type}</Text>
                    {/* <Text>{activity.date}</Text> */}
                    <Text>{activity.start}</Text>
                    <Text>{activity.endTime}</Text>
                    <Text>{calculateActivityDistance()}</Text>
                    <OpenWeatherMapAPI lat={activityTrack[0]['latitude']} lon={activityTrack[0]['longitude']} />
                </View>
                <View style={styles.notesContainer}>
                    <TextInput
                        style={styles.notes}
                        onChangeText={onChangeNotes}
                        placeholder={'Notes'}
                        value={notes}
                        onSubmitEditing={Keyboard.dismiss} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.buttons}
                        color='#a83232'
                        title='Discard Activity'
                        onPress={() => {
                            console.log('Save activity pressed')
                        }} />
                    <Button
                        style={styles.buttons}
                        color='#a83232'
                        title='Save Activity'
                        onPress={() => {
                            console.log('Save activity pressed')
                        }} />
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
    activityContainer: {
        width: '100%',
        paddingHorizontal: 20,
        // display: 'flex',
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: colors.white,
    },
    activityInfo: {
        width: '100%',
        // paddingHorizontal: 20,
        paddingTop: 15,
    },
    activityName: {
        fontSize: 22,
        marginBottom: 10,
    },
    notesContainer: {
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
    }
});