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
import { useRoute } from '@react-navigation/native';
import {DeleteProduct} from "../react-query/ProductAction";
import {useMutation,useQueryClient} from "react-query";

const ProductDetail:React.FC=()=>{
    const useQuery=useQueryClient();
    const navigation=useNavigation();
    const route = useRoute();
    const id=route.params?.id;

    const Delete=(data:any)=>{
        DeleteProduct(data);
        useQuery.invalidateQueries("products")
    }

    return(
        <View style={styles.root}>
            <Image source={{uri: route.params?.image || 'null'}}/>
            <Text>{route.params?.image || 'null'}</Text>
            <Text style={styles.productName}>{route.params?.productName || 'null'}</Text>
            <Text style={styles.productPrice}>{route.params?.price || 'null'}</Text>
            <Text style={styles.productReview}>bla bla bla</Text>
            <View style={styles.btnContainer}>
                <CustomButton label='Edit'  colorCode='#ff2bfa' />
                <CustomButton label='Delete'  colorCode='#FF272C' onPress={()=>{Delete(id); navigation.goBack()}}/>
                <CustomButton label='Cancel'  colorCode='#24FFF2' onPress={navigation.goBack} />
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    root:{
        flexDirection:'column',
        flex: 1
    },
    btnContainer:{

    },
    productName:{
        fontSize:26,
        fontWeight:'400',
    },
    productReview:{
        fontSize:15,
        fontWeight:'300',
        fontStyle:'italic',
    },
    productPrice:{
        fontSize: 16,
        color:'red',
        fontWeight:'600',
    }
})

export default ProductDetail;
