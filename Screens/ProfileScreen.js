import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import AuthenticationNavigator from '../Navigation/AuthenticationNavigator';

const ProfileScreen = ({ navigation }) => {
    const [userID, setUserID] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUserID(uid);
            const email = user.email;
            setUserEmail(email);
            // console.log(`user ID is - ${uid}`);
            // console.log(`email is - ${email}`);
        } else {
            // User is signed out
        }
    });

    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate(AuthenticationNavigator);
            })
    }
    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
            <Text>{userID}</Text>
            <Text>{userEmail}</Text>
            <Button
                title='Sign out'
                onPress={() => signOut()} />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})