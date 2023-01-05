/**
 * @fileoverview This file represets the PasAcivityScreen which shows detailed information and data
 * on a user's past activity that they have recorded.
 * 
 * This screen uses these component:
 *  - 'BackButtonComponent' to navigted back to the 'ExploreScreen'
 *  - 'ActivityMapPreviewComponent' to show a preview of the activity's route
 *  - 'ActivityInfoComponent' to show the activitiy's key statistics and info
 *  - 'ActivityAltitudeChartComponent' to display a line chart of the activity's altitiude
 * 
 * @param {Object} data - An object of the activity's information
 */
import ActivityAltitudeChartComponent from '../Components/ActivityAltitudeChartComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import BackButtonComponent from '../Components/BackButtonComponent';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import colors from '../colors';
import React from 'react';

const PastActivityScreen = (data) => {
    const activity = data.route.params.data;
    // console.log(activity);  // For Testing

    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    /**
     * Displays the activities notes, if the user has added notes to the activity
     */
    const hasNotes = () => {
        if (activity.notes) {
            // console.log('notes');
            return (
                <Text style={styles.notes}>{activity.notes}</Text>
            )
        } else {
            // console.log('no notes');
            return (
                <Text style={styles.notes}>No notes</Text>
            )
        }
    }

    /**
     * Deletes the activity if they have pressed the 'Delete Activity' pressable
     */
    const deleteActivity = () => {
        deleteDoc(doc(db, 'activities', `${activity.uid}:${activity.endTime}`));
        navigation.goBack();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <BackButtonComponent />
                <ActivityMapPreviewComponent activityTrack={activityTrack} polyLineTrack={polyLineTrack} />
                <ActivityInfoComponent
                    activityInfo={activity} />
                <ActivityAltitudeChartComponent
                    altitude={activity.altitude} />
                {hasNotes()}
                <Pressable
                    style={styles.deleteActivityButton}
                    accessibilityLabel='Delete Activity'
                    onPress={() => {
                        deleteActivity();
                    }}
                >
                    <Text style={styles.pressableText}>Delete Activity</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PastActivityScreen

const styles = StyleSheet.create({
    notes: {
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    deleteActivityButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})