/**
 * @fileoverview This file is for WelcomeScreen which is the first screen that the user will see 
 * when they open the app for the first time. There are buttons to navigate to the login for 
 * existing users and the create account screen for new users. Below the buttons is the 
 * SocialsComponent for the app's socials  
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialsComponent from '../Components/SocialsComponent';
import colors from '../colors';
import React from 'react';

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.welcomeContainer}>
            <Text style={styles.title}>Activity Tracker</Text>
            <Text style={styles.subTitle}>Record & View Your Activites</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.navigateButton}
                    accessibilityLabel='create account button'
                    onPress={() => {
                        navigation.push('LoginScreen')
                    }} >
                    <Text style={styles.pressableText}>Login</Text>
                </Pressable>
                <Pressable
                    style={styles.navigateButton}
                    accessibilityLabel='create account button'
                    onPress={() => {
                        navigation.push('CreateAccountScreen')
                    }} >
                    <Text style={styles.pressableText}>create account</Text>
                </Pressable>
            </View>
            <SocialsComponent />
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 42,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 22,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '85%',
    },
    navigateButton: {
        width: '100%',
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})