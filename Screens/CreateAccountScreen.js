import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';
import BackButtonComponent from '../Components/BackButtonComponent';
import colors from '../colors';
import { Picker } from '@react-native-picker/picker';

const CreateAccountScreen = ({ navigation }) => {

    const [email, setEmail] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [favouriteActivity, setFavouriteActivity] = useState('Walking');
    const [password, setPassword] = useState(null);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const db = getFirestore(app);

    const createAccount = () => {
        // console.log('create account initiated');
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
                        activity: favouriteActivity,
                    }
                    setDoc(collectionRef, newUser, { merge: true });
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
                        <View style={styles.createAccountSelectContainer}>
                            <Picker
                                style={styles.createAccountSelectInput}
                                selectedValue={favouriteActivity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFavouriteActivity(itemValue)
                                }>
                                <Picker.Item label='Walking' value='Walking' />
                                <Picker.Item label='Running' value='Running' />
                                <Picker.Item label='Cycling' value='Cycling' />
                                <Picker.Item label='Mountain Biking' value='Mountain Biking' />
                                <Picker.Item label='Hiking' value='Hiking' />
                            </Picker>
                        </View>
                        <TextInput
                            style={styles.createAccountInput}
                            onChangeText={setPassword}
                            value={password}
                            placeholder={'Password'}
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
    createAccountSelectContainer: {
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: colors.white,
        height: 37,
        fontSize: 10,
    },
    createAccountSelectInput: {
        opacity: 0.45,
        width: '110%',
        transform: [
            { scaleX: 0.9 },
            { scaleY: 0.9 },
            { translateX: -20 },
            { translateY: -8 },
        ],
        padding: 0,
        margin: 0,
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