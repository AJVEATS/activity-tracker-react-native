import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButtonComponent from '../Components/BackButtonComponent';
import ActivityMapPreviewComponent from '../Components/ActivityMapPreviewComponent';
import ActivityInfoComponent from '../Components/ActivityInfoComponent';
import ActivityAltitudeChartComponent from '../Components/ActivityAltitudeChartComponent';

const PastActivityScreen = (data) => {
    const activity = data.route.params.data;
    // console.log(activity);  // For Testing

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
})