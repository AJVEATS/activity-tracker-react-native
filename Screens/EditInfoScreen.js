/**
 * @fileoverview This file represets the EditInfoSccreen which displays a form 
 * which allows the user to update their account information (using the EditInfoCopmonent).
 * 
 * @param {Object} item - An object containing user's information
 * 
 */
import BackButtonComponent from '../Components/BackButtonComponent';
import EditInfoComponent from '../Components/EditInfoComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React from 'react';

const EditInfoScreen = (item) => {
    const userInfo = item.route.params.info
    // console.log(userInfo); // For Testing
    return (
        <SafeAreaView>
            <BackButtonComponent />
            <EditInfoComponent info={userInfo} />
        </SafeAreaView>
    )
}

export default EditInfoScreen

const styles = StyleSheet.create({})