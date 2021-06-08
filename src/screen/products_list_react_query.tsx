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
import Item from "../compoments/item";
import axios from "axios";
import {baseUrl} from "../constant";
import {QueryProducts} from "../react-query/queryProducts";



// @ts-ignore
const renderItem = ({item}) => (
    // @ts-ignore
    <Item productName={item.productName} price={item.price} image={item.image} id={item.id}/>
);

const options={
    method:'GET',
}
const {width, height} = Dimensions.get('window');
const Products_List: React.FC = () => {
    const [state, setState] = useState('');
    const navigation=useNavigation();
    // useEffect(() => {
    //     fetch(`${baseUrl}products`, options).then(response=>response.json()).then(data=>{setState(data)
    //     }).catch(e=>console.log(e))
    // },[]);
    const Products=QueryProducts();
    console.log(Products);

    // axios.get(`${baseUrl}products`).then(response => {
    //     console.log(response);
    //     setState(response.data)
    // }).catch(error => {
    //     console.log(error);
    // });

    // console.log(state)
    if (Products.isLoading) {
        return <ActivityIndicator size={100} color='#ff2bfa'/>
    }

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.root}>
                <View style={styles.btnContainer} >
                    <CustomButton label={' Add product '} colorCode={'#ff2bfa'} onPress={()=>{
                        console.log('press');
                        navigation.navigate('ProductsAction');
                    }}/>
                </View>
                <View style={styles.productsContainer}>
                    <FlatList
                        data={Products?.data?.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        initialNumToRender={ 10 }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    root:{
        flexDirection:'column',
        flex: 1
    },
    btnContainer:{
        marginHorizontal:10,
    },
    productsContainer:{
        flexWrap:'wrap',
        //backgroundColor:'red',
        flex: 1
    },
})



export default Products_List;

