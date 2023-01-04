/**
 * @fileoverview This file represets the EditInfoComponent which displays a form which allows the user to
 * update their account information that is stored in the firebase firestore collection. Each field is pre
 * populated with the user's current information from their firestore collection.
 * 
 * @param {Object} data - An object which includes all of the user's information from the firestore document.
 * 
 */
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from './FirebaseAuthComponent';
import { getAuth, updateEmail } from "firebase/auth";
import { Picker } from '@react-native-picker/picker';
import { initializeApp } from 'firebase/app';
import React, { useState } from 'react';
import colors from '../colors';

const EditInfoComponent = (data) => {
    const navigation = useNavigation();
    // console.log(data.info);  // For Testing
    const user = data.info;

    // const [updatedEmail, updateEmail] = useState(user.email);
    const [updatedFirstname, updateFirstname] = useState(user.firstname);
    const [updatedLastName, updateLastname] = useState(user.lastname)
    const [updatedActivity, updateActivity] = useState(user.activity);

    /**
     * Updates the user's information stored in the firebase firestore collection. The user's document is 
     * updated using the values from the forms inputs. There is error handling in case there is an error 
     * updating the user's information
     * 
     * @param {uid} The current user's userID
     */
    const updateUserInfo = (uid) => {
        // console.log(`update user info for ${uid}`);  // For Testing
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

        const db = getFirestore(app);

        try {
            const collectionRef = doc(db, 'users', user.userID);
            const updatedUser = {
                // email: updatedEmail,
                firstname: updatedFirstname,
                lastname: updatedLastName,
                activity: updatedActivity,
            }
            setDoc(collectionRef, updatedUser, { merge: true });
            navigation.goBack();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧑 Update your info</Text>
            <Text style={styles.subtitle}>Update your account's infomation here:</Text>
            <View style={styles.updateInfoForm}>
                {/* <TextInput
                    style={styles.updateUserInput}
                    onChangeText={updateEmail}
                    value={updatedEmail}
                /> */}
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
                        }
                    >
                        <Picker.Item label='Walking' value='Walking' />
                        <Picker.Item label='Running' value='Running' />
                        <Picker.Item label='Cycling' value='Cycling' />
                        <Picker.Item label='Mountain Biking' value='Mountain Biking' />
                        <Picker.Item label='Hiking' value='Hiking' />
                    </Picker>
                </View>
                <Pressable
                    style={styles.accountButton}
                    accessibilityLabel='Update Info button'
                    onPress={() => updateUserInfo(user.userID)}
                >
                    <Text style={styles.pressableText}>Update Info</Text>
                </Pressable>
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
    updateInfoForm: {},
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
        width: '100%',
        transform: [
            { translateX: 0 },
            { translateY: -13 },
        ],
    },
    accountButton: {
        backgroundColor: colors.black,
        borderRadius: 4,
        padding: 10,
        marginHorizontal: 0,
        marginBottom: 10,
        alignItems: 'center',
    },
    pressableText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
})