import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import React from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3dqjY7sjqHRM1GKPNbMdM92I5Nd6UPKw",
    authDomain: "ubicomp-2-av.firebaseapp.com",
    projectId: "ubicomp-2-av",
    storageBucket: "ubicomp-2-av.appspot.com",
    messagingSenderId: "448485848532",
    appId: "1:448485848532:web:fdd2ee2cda98422b5c9241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const FirebaseAuthComponent = () => {
    return (
        <View>
            <Text>FirebaseAuthComponent</Text>
        </View>
    )
}

export default FirebaseAuthComponent

const styles = StyleSheet.create({})