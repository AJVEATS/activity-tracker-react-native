import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
            // doc.data() is never undefined for query doc snapshots
            setActivities(activities => [...activities, { activityId: doc.id, activityData: doc.data() }])
            // activities.push({ activityId: doc.id, activityData: doc.data() });
            // activities.push({ activityId: location['coords']['latitude'], longitude: location['coords']['longitude'] })
            // console.log(activities[0].activityId);
            // console.log(activities);
            // console.log(doc.id, " => ", doc.data());
        });
    }

    useEffect(() => {
        const getActivitiesRerender = navigation.addListener("focus", () => {
            setActivities([]);
            getActivities();
        })
        // getActivities();
    }, []);

    return (
        <SafeAreaView>
            <Text>Explore</Text>
            <FlatList
                data={activities}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.activityData.name}</Text>
                        <Text>{item.activityData.type}</Text>
                        <Text>{item.activityData.date}</Text>
                        <Text>{item.activityData.endTime}</Text>
                        <Text>{item.activityData.start}</Text>
                        <Text>{item.activityData.time.seconds}</Text>
                        <Text>{item.activityData.uid}</Text>
                    </View>
                )}
            // keyExtractor={(item) => item.activityId}
            />
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({})