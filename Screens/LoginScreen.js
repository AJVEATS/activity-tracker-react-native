import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email);
                navigation.navigate(MainBottomTabNavigator);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage);
            });
    }

    return (
        <SafeAreaView style={styles.loginContainer}>
            <Text>Login screen</Text>
            <View style={styles.loginForm}>
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
                    title='login'
                    onPress={() => {
                        login()
                    }} />
            </View>
            <Button
                color='#a83232'
                title='Create Account'
                onPress={() => {
                    navigation.push('CreateAccountScreen');
                }} />
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginForm: {},
})