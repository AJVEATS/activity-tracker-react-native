import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const ExploreScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    async function getActivities() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const q = query(collection(db, "activities"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setActivities(activities => [...activities, { activityId: doc.id, activityData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data());
        });
    }

    useEffect(() => {
        const getActivitiesRerender = navigation.addListener("focus", () => {
            setActivities([]);
            getActivities();
        })
    }, []);

    return (
        <SafeAreaView style={styles.exploreScreen}>
            <Text style={styles.exploreTitle}>Explore Past Activities</Text>
            <FlatList
                data={activities}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.flatListSeperator}></View>
                    )
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.activityCard}>
                        <Text>{item.activityData.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    exploreScreen: {
        marginHorizontal: 20,
        marginTop: 5,
    },
    exploreTitle: {
        fontSize: 24,
        marginBottom: 10,
    },
    flatListSeperator: {
        height: 10,
    },
    activityCard: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 4,
    },
})