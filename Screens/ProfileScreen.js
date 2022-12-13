import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import AuthenticationNavigator from "../Navigation/AuthenticationNavigator";
import React from 'react';

const ProfileScreen = ({ navigation }) => {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const signOut = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate(AuthenticationNavigator);
            })
    }
    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
            <Button
                title='Sign out'
                onPress={() => signOut()} />
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})