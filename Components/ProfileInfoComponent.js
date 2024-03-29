/**
 * @fileoverview This file represets the ProfileInfoComponet which displays the user's account information
 * 
 * @param {Object} data - The user's account information
 */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../colors';

const ProfileInfoComponent = (data) => {
    // console.log(data.info); // For Testing
    const user = data.info;

    return (
        <View style={styles.infoContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.userInfoTitle}>Your info:</Text>
                <Text style={styles.info}>
                    <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                    {user.email}</Text>
                <Text style={styles.info}>
                    <Text style={{ fontWeight: 'bold' }}>First name: </Text>
                    {user.firstname}</Text>
                <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Last name: </Text>
                    {user.lastname}</Text>
                <Text style={styles.info}><Text style={{ fontWeight: 'bold' }}>Your sport: </Text>
                    {user.activity}</Text>
            </View>
        </View>
    )
}

export default ProfileInfoComponent

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: colors.lesserTransparentBlack,
        borderRadius: 4,
        padding: 10,
        paddingBottom: 0,
        marginHorizontal: '5%',
        marginBottom: 10,
    },
    userInfo: {
        width: '90%',
        marginBottom: 10,
    },
    userInfoTitle: {
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold',
        color: colors.white,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
        color: colors.white,
    },
})