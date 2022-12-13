import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import FirebaseAuthComponent from '../Components/FirebaseAuthComponent'

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            {/* <FirebaseAuthComponent /> */}
            <Text>Login screen</Text>
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

const styles = StyleSheet.create({})