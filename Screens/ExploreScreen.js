/**
 * @fileoverview This file represets the ExploreScreen which displays a flat list of all of the user's
 * recorded activties. To display the data for each activity this screen uses the 'PastActivityCardComponent'
 * and passes through an object with the activity's information.
 * 
 * @param navigation - For navigation
 */
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import PastActivityCardComponent from '../Components/PastActivityCardComponent';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import colors from '../colors';

const ExploreScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    const app = initializeApp(firebaseConfig);  // Connecting to the firestore collection
    const auth = getAuth(app);
    const user = (auth.currentUser);    // Getting the current user's data
    // console.log(user.uid); // For Testing

    useEffect(() => {
        /**
         * This fetches the user's past recorded activities every time this screen comes in focus.
        */
        const getActivitiesRerender = navigation.addListener("focus", () => {
            getActivities();
        });
    }, []);

    /**
     * Gets all of the users stored activity documents from the 'activites' collection by their
     * user id. It sets the useState of 'activities' to all of the activity data from firestore
     */
    async function getActivities() {

        setActivities([]);
        const db = getFirestore(app);  // Connecting to the firestore database
        const q = query(collection(db, "activities"), where('uid', '==', user.uid));   // Creating a query to get the activities with the user's user id

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setActivities(activities => [...activities, { activityId: doc.id, activityData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data()); // For Testing
        });
    }

    return (
        <SafeAreaView style={styles.exploreScreen}>
            <Text style={styles.exploreTitle}>Activity History</Text>
            <FlatList
                data={activities}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.flatListSeperator}></View>
                    )
                }}
                renderItem={({ item }) => (
                    <PastActivityCardComponent activityData={item.activityData} />
                )}
                ListEmptyComponent={() => {
                    return (
                        <Text style={styles.noActivities}>No Activity History 😥</Text>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={styles.flatListFooter}></View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    exploreScreen: {
        marginTop: 10,
    },
    exploreTitle: {
        fontSize: 24,
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    flatListSeperator: {
        height: 10,
    },
    flatListFooter: {
        height: 50,
    },
    noActivities: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: colors.black,
        opacity: 0.8,
    },
})