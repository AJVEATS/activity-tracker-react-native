/**
 * @fileoverview This file represets the PlaceButtonComponent this includes a back pressable to navigate to
 * the previous screen and a favourite pressable.
 */
import { StyleSheet, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
import React from 'react';

const BackButtonComponent = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable style={styles.backPressable} onPress={() => navigation.goBack()} >
                <Ionicons name={"arrow-back"} size={32} color={colors.black} />
            </Pressable>
        </View>
    );
}

export default BackButtonComponent

const styles = StyleSheet.create({
    backPressable: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 100,
    },
    heartPressable: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 100,
    },
})