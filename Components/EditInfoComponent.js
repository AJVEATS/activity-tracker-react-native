import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { firebaseConfig } from './FirebaseAuthComponent';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const EditInfoComponent = (data) => {
    console.log(data.info);
    const user = data.info;

    const [updatedEmail, updateEmail] = useState(user.email);
    const [updatedFirstname, updateFirstname] = useState(user.firstname);
    const [updatedLastName, updateLastname] = useState(user.lastname)
    const [updatedActivity, updateActivity] = useState(user.activity);

    const updateUserInfo = (uid) => {
        // console.log(`update user info for ${uid}`);
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        try {

            const collectionRef = doc(db, 'users', user.userID);
            const updatedUser = {
                email: updatedEmail,
                firstname: updatedFirstname,
                lastname: updatedLastName,
                activity: updatedActivity,
            }
            setDoc(collectionRef, updatedUser, { merge: true });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧑 Update your info</Text>
            <Text style={styles.subtitle}>Update your account's infomation here:</Text>
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
                <View style={styles.selectContainer}>
                    <Picker
                        style={styles.updateUserActivity}
                        selectedValue={updatedActivity}
                        onValueChange={(itemValue, itemIndex) =>
                            updateActivity(itemValue)
                        }>
                        <Picker.Item label='Walking' value='Walking' />
                        <Picker.Item label='Running' value='Running' />
                        <Picker.Item label='Cycling' value='Cycling' />
                        <Picker.Item label='Mountain Biking' value='Mountain Biking' />
                        <Picker.Item label='Hiking' value='Hiking' />
                    </Picker>
                </View>
                <Button
                    title='update info'
                    onPress={() => {
                        updateUserInfo(user.userID);
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
    subtitle: {
        marginBottom: 10,
        fontSize: 18,
    },
    updateInfoForm: {

    },
    updateUserInput: {
        fontSize: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
        height: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
    },
    selectContainer: {
        height: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
    },
    updateUserActivity: {
        fontSize: 28,
        width: '110%',
        transform: [
            { scaleX: 1.3 },
            { scaleY: 1.3 },
            { translateX: 40 },
            { translateY: -11 },
        ],
    },
})