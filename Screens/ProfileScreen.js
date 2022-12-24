import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDoc, doc, Firestore } from 'firebase/firestore';

import AuthenticationNavigator from '../Navigation/AuthenticationNavigator';

const ProfileScreen = ({ navigation }) => {
    const [userFirstname, setUserFirstname] = useState('loading...');
    const [userLastname, setUserLastname] = useState('loading...');
    const [userEmail, setUserEmail] = useState('loading...');

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // setUserEmail(user.email);
                getUserDetails(user);
            } else {
                // User is signed out
            }
        });
    }, [])

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    async function getUserDetails(user) {

        const db = getFirestore(app);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserEmail(docSnap.data().email);
            setUserFirstname(docSnap.data().firstname);
            setUserLastname(docSnap.data().lastname);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate(AuthenticationNavigator);
            })
    }
    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
            <Text>{userEmail}</Text>
            <Text>{userFirstname}</Text>
            <Text>{userLastname}</Text>
            <Button
                title='Sign out'
                onPress={() => signOut()} />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})