import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileInfoComponent = (data) => {

    console.log(data.info);
    const user = data.info;

    return (
        <View>
            <Text>{user.email}</Text>
            <Text>{user.firstname}</Text>
            <Text>{user.lastname}</Text>
        </View>
    )
}

export default ProfileInfoComponent

const styles = StyleSheet.create({})