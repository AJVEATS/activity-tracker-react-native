import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDoc, doc, Firestore } from 'firebase/firestore';

import AuthenticationNavigator from '../Navigation/AuthenticationNavigator';
import ProfileInfoComponent from '../Components/ProfileInfoComponent';

const ProfileScreen = ({ navigation }) => {
    const [userFirstname, setUserFirstname] = useState('loading...');
    const [userLastname, setUserLastname] = useState('loading...');
    const [userEmail, setUserEmail] = useState('loading...');
    const [favouriteActivity, setFavouriteActivity] = useState('loading...');
    const [userInfo, setUsetInfo] = useState([]);

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
        // const docRef = doc(db, 'users', 'HPApDQRYl4gUslEzx1Cb2KHLJ703');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserEmail(docSnap.data().email);
            setUserFirstname(docSnap.data().firstname);
            setUserLastname(docSnap.data().lastname);
            setFavouriteActivity(docSnap.data().activity);

            setUsetInfo({
                userID: user.uid,
                email: docSnap.data().email,
                firstname: docSnap.data().firstname,
                lastname: docSnap.data().lastname,
                activity: docSnap.data().activity
            });
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

    const deleteAccount = (uid) => {
        console.log(`account delete initialised ${uid}`);
    }

    return (
        <SafeAreaView>
            <ProfileInfoComponent info={userInfo} />
            <Button
                title='Update info'
                onPress={() => navigation.push('Edit Info Screen', { info: userInfo })} />
            <Button
                title='Sign out'
                onPress={() => signOut()} />
            <Button
                title='Delete Account'
                onPress={() => deleteAccount(userInfo.userID)} />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})