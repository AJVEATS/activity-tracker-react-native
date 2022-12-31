import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButtonComponent from '../Components/BackButtonComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import ActivityAltitudeChartComponent from '../Components/ActivityAltitudeChartComponent';
import colors from '../colors';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';

const PastActivityScreen = (data) => {
    const activity = data.route.params.data;
    // console.log(activity);  // For Testing

    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const activityTrack = activity.route;
    const polyLineTrack = Object.keys(activityTrack).map(key => activityTrack[key]);

    const hasNotes = () => {
        if (activity.notes) {
            // console.log('no notes');
            return (
                <Text style={styles.notes}>{activity.notes}</Text>
            )
        } else {
            // console.log('no notes');
        }
    }

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
                    }} >
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