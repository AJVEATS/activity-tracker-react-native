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
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import colors from '../colors';

const ExploreScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [title, setTitle] = useState('Your Activity History');
    const [publicButtonColor, setPublicButtonColor] = useState(colors.black);
    const [publicIconColor, setPublicIconColor] = useState(colors.white);
    const [privateButtonColor, setPrivateButtonColor] = useState(colors.black);
    const [privateIconColor, setPrivateIconColor] = useState(colors.white);
    const [publicButtonDisabled, setPublicButtonDisabled] = useState(false);
    const [privateButtonDisabled, setPrivateButtonDisabled] = useState(true);

    const app = initializeApp(firebaseConfig);  // Connecting to the firestore collection
    const auth = getAuth(app);
    const user = (auth.currentUser);    // Getting the current user's data
    // console.log(user.uid); // For Testing

    useEffect(() => {
        /**
         * This fetches the user's past recorded activities every time this screen comes in focus.
        */
        const getActivitiesRerender = navigation.addListener("focus", () => {
            getActivities('uid', user.uid);

            setTitle('Your Activity History');

            setPrivateButtonDisabled(true);
            setPublicButtonDisabled(false);

            setPrivateButtonColor(colors.white);
            setPrivateIconColor(colors.black);
            setPublicButtonColor(colors.black);
            setPublicIconColor(colors.white);
        });
    }, []);

    /**
     * Gets all of the users stored activity documents from the 'activites' collection by their
     * user id. It sets the useState of 'activities' to all of the activity data from firestore
     * 
     * @param {field} The field for the firestore get query
     * @param {fieldValue} The field value for the firestore query
     */
    async function getActivities(field, fieldValue) {

        setActivities([]);
        const db = getFirestore(app);  // Connecting to the firestore database
        const q = query(collection(db, "activities"), where(field, '==', fieldValue));   // Creating a query to get the activities with the user's user id

        if (field == 'privacy') {
            setTitle('Community Activities');
        } else if (field == 'uid') {
            setTitle('Your Activity History');
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setActivities(activities => [...activities, { activityId: doc.id, activityData: doc.data() }]);
            // console.log(doc.id, " => ", doc.data()); // For Testing
        });
    }

    /**
     * Changes the firestore get query to show all of the activities set to public
    */
    const publicButtonPress = () => {
        // console.log('public button pressed'); // For Testing
        setPublicButtonColor(colors.white);
        setPublicIconColor(colors.black);
        setPrivateButtonColor(colors.black);
        setPrivateIconColor(colors.white);

        setPublicButtonDisabled(true);
        setPrivateButtonDisabled(false);

        setActivities([]);
        setTitle('Community Activities');
        getActivities('privacy', 'public');
        // console.log('privacy', 'public'); // For Testing
    }

    /**
     * Changes the firestore get query to show all of the user's activities
    */
    const privateButtonPress = () => {
        // console.log('private button pressed'); // For Testing
        setPrivateButtonColor(colors.white);
        setPrivateIconColor(colors.black);
        setPublicButtonColor(colors.black);
        setPublicIconColor(colors.white);

        setPrivateButtonDisabled(true);
        setPublicButtonDisabled(false);

        setActivities([]);
        getActivities('uid', user.uid);
        // console.log('uid', user.uid); // For Testing
    }

    return (
        <SafeAreaView style={styles.exploreScreen}>
            <Text style={styles.exploreTitle}>{title}</Text>
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
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, { backgroundColor: publicButtonColor }]}
                    accessibilityLabel='View public activities'
                    disabled={publicButtonDisabled}
                    onPress={() => {
                        publicButtonPress();
                    }}
                >
                    <Ionicons name="people-outline" size={24} color={publicIconColor} />
                </Pressable>
                <Pressable
                    style={[styles.button, { backgroundColor: privateButtonColor }]}
                    accessibilityLabel='View your activities'
                    disabled={privateButtonDisabled}
                    onPress={() => {
                        privateButtonPress();
                    }}
                >
                    <Ionicons name="person-outline" size={24} color={privateIconColor} />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    exploreScreen: {
        marginTop: 10,
        height: '100%',
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
        height: 75,
    },
    noActivities: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        color: colors.black,
        opacity: 0.8,
    },
    buttonContainer: {
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        width: '48%',
        textAlignVertical: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})