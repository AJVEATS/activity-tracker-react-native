import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../colors'

const WelcomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>WelcomeScreen</Text>
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
        </SafeAreaView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    navigateButton: {
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