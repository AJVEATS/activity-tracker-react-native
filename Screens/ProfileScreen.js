import { Button, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc, deleteDoc } from 'firebase/firestore';

import AuthenticationNavigator from '../Navigation/AuthenticationNavigator';
import ProfileInfoComponent from '../Components/ProfileInfoComponent';
import colors from '../colors';

const ProfileScreen = ({ navigation }) => {
    const [userFirstname, setUserFirstname] = useState('loading...');
    const [userLastname, setUserLastname] = useState('loading...');
    const [userEmail, setUserEmail] = useState('loading...');
    const [favouriteActivity, setFavouriteActivity] = useState('loading...');
    const [userInfo, setUsetInfo] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserDetails(user);
            }
        });
    }, []);

    const profileInfoRerender = navigation.addListener("focus", () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserDetails(user);
            }
        });
    })

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const db = getFirestore(app);

    async function getUserDetails(user) {

        const docRef = doc(db, "users", user.uid);
        // const docRef = doc(db, 'users', 'HPApDQRYl4gUslEzx1Cb2KHLJ703'); // For Testing
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
            console.log("No such document!");
        }
    }

    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate(AuthenticationNavigator);
            })
    }

    async function deleteAccount(uid) {
        console.log(`account delete initialised ${uid}`);
        deleteDoc(doc(db, 'users', uid));
        navigation.navigate(AuthenticationNavigator);
    }

    return (
        <SafeAreaView>
            <Text style={styles.title}>Welcome back {userFirstname} 👋</Text>
            <ProfileInfoComponent info={userInfo} />
            <Pressable
                style={styles.accountButton}
                accessibilityLabel='Update Info button'
                onPress={() => navigation.push('Edit Info Screen', { info: userInfo })} >
                <Text style={styles.pressableText}>Update Info</Text>
            </Pressable>
            <Pressable
                style={styles.accountButton}
                accessibilityLabel='Sign out button'
                onPress={() => signOut()} >
                <Text style={styles.pressableText}>Sign Out</Text>
            </Pressable>
            <Pressable
                style={styles.accountButton}
                accessibilityLabel='Delete account button'
                onPress={() => deleteAccount(userInfo.userID)}>
                <Text style={styles.pressableText}>Delete Account</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    title: {
        paddingTop: 15,
        paddingBottom: 10,
        fontSize: 24,
        paddingHorizontal: '5%',
    },
    accountButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})