/**
 * @fileoverview This file reprsents the SocialsComponent that renders pressable icons for all of the social 
 * media accounts. Pressing an icon will open that social media in the user's browser.
 */
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Linking } from 'react-native';
import colors from '../colors';
import React from 'react';

const SocialsComponent = () => {
    return (
        <View style={styles.socialContainer}>
            <Ionicons
                style={styles.icon}
                name='logo-facebook'
                onPress={() => {
                    Linking.openURL('https://www.facebook.com/')
                }}
            />
            <Ionicons
                style={styles.icon}
                name='logo-instagram'
                onPress={() => {
                    Linking.openURL('https://www.instagram.com/')
                }}
            />
            <Ionicons
                style={styles.icon}
                name='logo-twitter'
                onPress={() => {
                    Linking.openURL('https://www.twitter.com/')
                }}
            />
            <Ionicons
                style={styles.icon}
                name='logo-youtube'
                onPress={() => {
                    Linking.openURL('https://www.youtube.com/')
                }}
            />
        </View>
    )
}

export default SocialsComponent

const styles = StyleSheet.create({
    socialContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-evenly'
    },
    icon: {
        color: colors.black,
        marginHorizontal: 5,
        fontSize: 32,
    }
})