import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import colors from '../colors';
import { getAuth } from 'firebase/auth';

const ExploreScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const user = (auth.currentUser);
    console.log(user.uid)
    // setUserID(user.uid);

    useEffect(() => {
        const getActivitiesRerender = navigation.addListener("focus", () => {
            setActivities([]);
            getActivities();

        })
    }, []);

    async function getActivities() {
        // Initialize Firebase

        const db = getFirestore(app);

        const q = query(collection(db, "activities"), where('uid', '==', user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setActivities(activities => [...activities, { activityId: doc.id, activityData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data());
        });
    }

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
                ListEmptyComponent={() => {
                    return (
                        <Text style={styles.noActivities}>No Activity History 😥</Text>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    exploreScreen: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    exploreTitle: {
        fontSize: 24,
        marginBottom: 10,
    },
    flatListSeperator: {
        height: 10,
    },
    noActivities: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: colors.black,
        opacity: 0.8,
    },
    activityCard: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 4,
    },
})