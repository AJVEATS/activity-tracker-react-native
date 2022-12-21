import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';
import BackButtonComponent from '../Components/BackButtonComponent';
import colors from '../colors';

const CreateAccountScreen = ({ navigation }) => {

    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const db = getFirestore(app);

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user.email);
                try {

                    const collectionRef = doc(db, 'users', user.uid);
                    const newUser = {
                        uid: user.uid,
                        email: email,
                        firstname: firstName,
                        lastname: lastName,
                    }
                    setDoc(collectionRef, newUser, { merge: true });
                    // const docRef = setDoc(doc(db, "users", user.uid), {
                    //     uid: user.uid,
                    //     email: email,
                    //     firstname: firstName,
                    //     lastname: lastName,
                    // });
                    // console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

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
                source={{ uri: 'https://images.unsplash.com/photo-1608570004513-472c257f2149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
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
                            autoCapitalize='none'
                        />
                        <TextInput
                            style={styles.createAccountInput}
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholder={'First name'}
                        />
                        <TextInput
                            style={styles.createAccountInput}
                            onChangeText={setLastName}
                            value={lastName}
                            placeholder={'Last name'}
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
    },
    createAccountForm: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
        padding: 10,
        width: '85%'
    }
})