import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';

const CreateAccountScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email);
                navigation.navigate(MainBottomTabNavigator);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <SafeAreaView style={styles.createAccountContainer}>
            <Text>CreateAccountScreen</Text>
            <View style={styles.createAccountForm}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder={'Email'}
                    keyboardType={'email-address'}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder={'password'}
                    secureTextEntry={true}
                />
                <Button
                    color='blue'
                    title='create account'
                    onPress={() => {
                        createAccount();
                    }} />
            </View>
        </SafeAreaView>
    )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
    createAccountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createAccountForm: {},
})