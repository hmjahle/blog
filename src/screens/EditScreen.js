import React, {useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const EditScreen = ({navigation}) => {
    console.log(navigation.getParam('id'))
    return  ( 
    <View>
        <Text>Edit Screen - {navigation.getParam('id')} </Text>
    </View>
    );
};


const styles = StyleSheet.create({

});


export default EditScreen;