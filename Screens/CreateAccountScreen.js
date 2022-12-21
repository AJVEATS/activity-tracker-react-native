import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';
import BackButtonComponent from '../Components/BackButtonComponent';
import colors from '../colors';

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
                const user = userCredential.user;
                // console.log(user.email);
                navigation.navigate(MainBottomTabNavigator);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <SafeAreaView style={styles.createAccountContainer}>
            <ImageBackground
                style={styles.createAccountImage}
                // Image owner https://unsplash.com/@jakobowens1
                source={{ uri: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
                resizeMode="cover">
                <BackButtonComponent />
                <View style={styles.createAccountFormContainer}>
                    <View style={styles.createAccountForm}>
                        <Text style={styles.createAccountTitle}>Create Account</Text>
                        <TextInput
                            style={styles.createAccountInput}
                            onChangeText={setEmail}
                            value={email}
                            placeholder={'Email'}
                            keyboardType={'email-address'}
                        />
                        <TextInput
                            style={styles.createAccountInput}
                            onChangeText={setPassword}
                            value={password}
                            placeholder={'password'}
                            secureTextEntry={true}
                        />
                        <Pressable
                            style={styles.createAccountButton}
                            accessibilityLabel='Create account button'
                            onPress={() => {
                                createAccount();
                            }} >
                            <Text style={styles.pressableText}>create account</Text>
                        </Pressable>
                        {/* <Button
                            color='blue'
                            title='create account'
                            onPress={() => {
                                createAccount();
                            }} /> */}
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
    createAccountContainer: {
        flex: 1,
    },
    createAccountImage: {
        flex: 1,
    },
    createAccountFormContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountForm: {
        width: '80%',
    },
    createAccountTitle: {
        color: colors.white,
        marginBottom: 10,
        fontSize: 24,
    },
    createAccountInput: {
        backgroundColor: colors.white,
        borderRadius: 4,
        marginBottom: 10,
        padding: 5,
    },
    createAccountButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
})