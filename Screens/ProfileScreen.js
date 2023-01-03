/**
 * @fileoverview This file represets the ProfileScreen which allows the user to view their account details
 * using the 'ProfileInfoComponent'. The user is also able to go to the 'EditInfoScreen' to update their
 * account's information, to sign out of their account and to delete their account.
 * 
 * @param navigtaion - For navigation
 */
import AuthenticationNavigator from '../Navigation/AuthenticationNavigator';
import { getFirestore, getDoc, doc, deleteDoc, query, collection, where, getDocs } from 'firebase/firestore';
import ProfileInfoComponent from '../Components/ProfileInfoComponent';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Pressable, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import colors from '../colors';
import 'firebase/firestore';


const ProfileScreen = ({ navigation }) => {
    const [userFirstname, setUserFirstname] = useState('loading...');
    const [userLastname, setUserLastname] = useState('loading...');
    const [userEmail, setUserEmail] = useState('loading...');
    const [favouriteActivity, setFavouriteActivity] = useState('loading...');
    const [userInfo, setUsetInfo] = useState([]);

    useEffect(() => {
        /**
         * Gets the user's information from firebase authentication 
         */
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserDetails(user);
            }
        });
    }, []);

    /**
     * Updates the user's account useState variables when the screen in focus. This is to allow
     * the display variables to be updates once a user has just updated their accounts details.
     */
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
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    /**
     * Gets the current user's information stored in the firebase firestore 'users' collection, using the
     * user's id to get their specific information. It then updates the useState variables to the data
     * retrieved from the user's document 
     * 
     * @param {user} The current user's user id
     */
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

    /**
     * If the user presses the sign out pressable the user is signed out using firebase authentication.
     * They will be redirected to the 'WelcomeScreen' in the 'AuthenticationNavigator' as they are now
     * signed out.
     */
    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate(AuthenticationNavigator);
            })
    }

    /**
     * If the user has pressed the 'Delete Account' pressable the user's information is removed from the firebase
     * firestore 'users' collection.
     * 
     * @param {user} The current user's user id
     */
    async function deleteAccount(uid) {
        console.log(`account delete initialised ${uid}`);

        const q1 = query(collection(db, "activities"), where('uid', '==', uid));   // Creating a query to get the activities with the user's user id

        const querySnapshot = await getDocs(q1);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
            console.log(doc.ref); // For Testing
        });
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