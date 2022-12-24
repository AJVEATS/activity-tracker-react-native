import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditInfoComponent from '../Components/EditInfoComponent'
import BackButtonComponent from '../Components/BackButtonComponent'

const EditInfoScreen = (item) => {
    const userInfo = item.route.params.info
    // console.log(userInfo);
    return (
        <SafeAreaView>
            <BackButtonComponent />
            <EditInfoComponent info={userInfo} />
        </SafeAreaView>
    )
}

export default EditInfoScreen

const styles = StyleSheet.create({})