import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import colors from '../colors';
import { getAuth } from 'firebase/auth';
import PastActivityCardComponent from '../Components/PastActivityCardComponent';

const ExploreScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = (auth.currentUser);
    // console.log(user.uid); // For Testing

    useEffect(() => {
        const getActivitiesRerender = navigation.addListener("focus", () => {
            getActivities();
        });
    }, []);

    async function getActivities() {

        setActivities([]);
        const db = getFirestore(app);
        const q = query(collection(db, "activities"), where('uid', '==', user.uid));

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