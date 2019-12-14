import React, {useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Context } from '../context/BlogContext';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ShowScreen = ({navigation}) => {
    const {state } = useContext(Context);
    const blogPost = state.find(
        blogPost => blogPost.id === navigation.getParam('id')
        );
    
    return  ( 
    <View>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
    </View>
    );
};


const styles = StyleSheet.create({

});

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight:(
            <TouchableOpacity
                onPress={()=>
                    navigation.navigate('Edit', {id: navigation.getParam('id')})
                }
            >
               <EvilIcons name="pencil" size={35} />
            </TouchableOpacity>
        )
    };
};

export default ShowScreen;