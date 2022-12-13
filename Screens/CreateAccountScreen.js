import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainBottomTabNavigator from '../Navigation/MainBottomTabNavigator';

const CreateAccountScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>CreateAccountScreen</Text>
            <Button
                color='#a83232'
                title='Go Back'
                onPress={() => {
                    navigation.goBack();
                }} />
            <Button
                color='#a83232'
                title='Go to app'
                onPress={() => {
                    navigation.navigate(MainBottomTabNavigator);
                }} />
        </SafeAreaView>
    )
}

export default CreateAccountScreen

const styles = StyleSheet.create({})