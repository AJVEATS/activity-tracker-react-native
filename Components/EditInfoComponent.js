import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const EditInfoComponent = (data) => {
    console.log(data.info);
    const user = data.info;

    const [updatedEmail, updateEmail] = useState(user.email);
    const [updatedFirstname, updateFirstname] = useState(user.firstname);
    const [updatedLastName, updateLastname] = useState(user.lastname)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧑 Update your info</Text>
            <View style={styles.updateInfoForm}>
                <TextInput
                    style={styles.updateUserInput}
                    onChangeText={updateEmail}
                    value={updatedEmail}
                />
                <TextInput
                    style={styles.updateUserInput}
                    onChangeText={updateFirstname}
                    value={updatedFirstname}
                />
                <TextInput
                    style={styles.updateUserInput}
                    onChangeText={updateLastname}
                    value={updatedLastName}
                />
                <Button
                    title='update info'
                    onPress={() => {
                        console.log('update user info')
                    }}
                />
            </View>
        </View>
    )
}

export default EditInfoComponent

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        marginHorizontal: 30,
    },
    title: {
        marginHorizontal: 20,
        marginBottom: 15,
        fontSize: 28,
    },
    updateInfoForm: {

    },
    updateUserInput: {
        fontSize: 20,
        marginBottom: 10,
    }
})