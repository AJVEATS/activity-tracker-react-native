import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../colors';

const ProfileInfoComponent = (data) => {

    console.log(data.info);
    const user = data.info;

    return (
        <View style={styles.infoContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.userInfoTitle}>Your info:</Text>
                <Text style={styles.info}>
                    <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                    {user.email}
                </Text>
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
        width: '100%',
        alignItems: 'center',
    },
    userInfo: {
        width: '90%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 4,
        marginBottom: 10,
    },
    userInfoTitle: {
        fontSize: 20,
        marginBottom: 5,
    },
    info: {
        fontSize: 18,
        marginBottom: 5,
    },
})