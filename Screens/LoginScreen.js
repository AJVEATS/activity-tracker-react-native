import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseConfig } from '../Components/FirebaseAuthComponent';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';
import colors from '../colors';
import BackButtonComponent from '../Components/BackButtonComponent';

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
                const user = userCredential.user;
                // console.log(user.email);
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
            <ImageBackground
                style={styles.loginImage}
                // Image owner https://unsplash.com/@jakobowens1
                source={{ uri: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
                resizeMode="cover">
                <View style={styles.loginForm}>
                    <Text style={styles.loginTitle}>Login</Text>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setEmail}
                        value={email}
                        placeholder={'Email'}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={setPassword}
                        value={password}
                        placeholder={'Password'}
                        secureTextEntry={true}
                    />
                    <Pressable
                        style={styles.loginButton}
                        accessibilityLabel='Login button'
                        onPress={() => {
                            login()
                        }} >
                        <Text style={styles.pressableText}>login</Text>
                    </Pressable>
                    <Pressable
                        style={styles.createAccountButton}
                        accessibilityLabel='create account button'
                        onPress={() => {
                            navigation.push('CreateAccountScreen')
                        }} >
                        <Text style={styles.pressableText}>create account</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loginImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginForm: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 4,
        padding: 10,
        width: '85%'
    },
    loginTitle: {
        color: colors.white,
        marginBottom: 10,
        fontSize: 24
    },
    loginInput: {
        backgroundColor: colors.white,
        borderRadius: 4,
        marginBottom: 10,
        padding: 5,
    },
    loginButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    createAccountButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
})