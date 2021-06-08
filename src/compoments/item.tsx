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
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type ItemProps = {
    id:string;
    productName: string;
    price: string;
    image:string;
    onPress: (val: string) => void;
};


const {width, height} = Dimensions.get('window');
const Item: React.FC<ItemProps> = ({id,productName,price,image,onPress}) => {
    const navigation=useNavigation();
    return(
        <View>
            <TouchableOpacity onPress={
                () =>{
                navigation.navigate('ProductDetail',{id:id,productName:productName,price:price,image:image})
                }
            }>
                <View style={styles.itemContainer}>
                    <Image source={{uri: image}} style={styles.imgContainer} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {productName}
                        </Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'column',
        //backgroundColor: 'red',
        width: width * 0.45,
        height: 260,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 20,
    },
    imgContainer: {
        width: '100%',
        height: '60%',
        resizeMode: 'center',
        borderRadius: 20,
        //backgroundColor:'blue',
    },
    titleContainer: {
        //backgroundColor: 'green',
        height: '20%',
        width: '85%',
        marginVertical: 8,
    },
    priceContainer: {
        //backgroundColor: 'pink',
        height: '10%',
        width: '85%',
    },
    title: {
        fontSize: 18,
        width: '100%',
    },
    price: {
        fontSize: 16,
        color:'red',
        fontWeight:'600',
    },
})



export default Item;

