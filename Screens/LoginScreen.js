import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FirebaseAuthComponent from '../Components/FirebaseAuthComponent'

const LoginScreen = () => {
    return (
        <View>
            <FirebaseAuthComponent />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})