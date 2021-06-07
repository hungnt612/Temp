import React, {useContext,useEffect,useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from '@react-navigation/native'
import CustomButton from "../CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from "../CustomInput";



const {width, height} = Dimensions.get('window');
const Products_List: React.FC = () => {
    return (
        <SafeAreaView>
            <View style={styles.root}>
                <View style={styles.btnContainer}>
                    <CustomButton label={' Add product '} colorCode={'#ff2bfa'} onPress={()=>{
                        console.log('press');}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    root:{
        flexDirection:'column'
    },
    btnContainer:{
        marginHorizontal:10,
    },
})



export default Products_List;

