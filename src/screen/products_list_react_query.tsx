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

const DATA = [
    {
        id: '1',
        productName:
            'LAPTOP ACER NITRO 5 AN515-56-79U2 GTX 1650 4GB INTEL CORE I7 11370H 8GB 512GB 15.6 FHD IPS 144HZ MULTICOLOR WIN 10\n',
        price: '24.490.000₫',
        image: 'https://xgear.vn/wp-content/uploads/2021/04/an515-56-05-568x568.jpg',
    },
    {
        id: '2',
        productName: 'Màn hình cong Samsung LC49J890 49″ DFHD 144Hz USB-C',
        price: '21.490.000₫',
        image:
            'https://xgear.vn/wp-content/uploads/2018/04/vn-curved-gaming-c49j890dke-lc49j890dkexxv-frontblack-95180924_compressed-568x568.jpg',
    },
    {
        id: '3',
        productName: 'Màn hình cong Cooler Master GM27-CF 27″ VA 165Hz FullHD',
        price: '5.490.000₫ ',
        image:
            'https://xgear.vn/wp-content/uploads/2020/03/GM27-CF_1_compressed-568x568.jpg',
    },
    {
        id: '4',
        productName: 'Màn Hình ASUS VG248QG 24″ FullHD 165Hz 0.5ms G-sync Compatible',
        price: '5.890.000₫',
        image:
            'https://xgear.vn/wp-content/uploads/2019/08/VG258QR_thumb_b_compressed.jpg',
    },
    {
        id: '5',
        productName: 'Màn hình Samsung LF24T350FHEXXV 24″ IPS 75Hz Full viền',
        price: '3.290.000₫',
        image:
            'https://xgear.vn/wp-content/uploads/2020/08/LF27T350_compressed-568x568.jpg',
    },
    {
        id: '6',
        productName: 'Màn hình cong Samsung LC24RG50FQEXXV 24″ FHD 144Hz Freesync',
        price: '4.590.000₫',
        image:
            'https://xgear.vn/wp-content/uploads/2019/07/LC24RG50_1_compressed-1-568x568.jpg',
    },
];

import {baseUrl} from "../constant";


// @ts-ignore
const renderItem = ({item}) => (
    // @ts-ignore
    <Item productName={item.productName} price={item.price} image={item.image} />
);

const options={
    method:'GET',
}
const {width, height} = Dimensions.get('window');
const Products_List: React.FC = () => {
    const [state, setState] = useState('');
    fetch(`${baseUrl}products`, options).then(response=>response.json()).then(data=>{setState(data)
    }).catch(e=>console.log(e))
    // axios.get(`${baseUrl}products`).then(response => {
    //     console.log(response);
    //     setState(response.data)
    // }).catch(error => {
    //     console.log(error);
    // });


    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.root}>
                <View style={styles.btnContainer} >
                    <CustomButton label={' Add product '} colorCode={'#ff2bfa'} onPress={()=>{
                        console.log('press');}}/>
                </View>
                <View style={styles.productsContainer}>
                    <FlatList
                        data={state}
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

