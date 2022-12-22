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
    const [todos, setTodos] = useState([]);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const db = getFirestore(app);

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

    const fetchPost = async () => {

        await getDocs(collection(db, "users", userID))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setTodos(newData);
                console.log(todos, newData);
            })

    }
    useEffect(() => {
        fetchPost();
    }, [])

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