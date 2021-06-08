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
import {AddProduct,ThemSP} from "../react-query/ProductAction";
import {QueryProducts} from "../react-query/queryProducts";
import {useMutation,useQueryClient} from "react-query";


const schema = yup.object().shape({
    productName:yup.string().required(),
    price:yup.number().required(),
});

interface IFormInputs {
    productName:string;
    price:string;
    image:string;
}

const ProductsAction:React.FC=()=>{
    const queryClient=useQueryClient();
    const navigation=useNavigation();
    const onSubmit = (data: any) => {ThemSP(data);queryClient.invalidateQueries('products'); }
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    return(
        <View style={styles.root}>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label={'Product Name'}
                        placeholder={'Product Name'}
                        onChange={onChange}
                        value={value}
                    />
                )}
                rules={{required: true}}
                name={'productName'}
            />
            {errors.productName && <Text>This is required.</Text>}
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label={'Product Price'}
                        placeholder={'Product Price'}
                        onChange={onChange}
                        value={value}
                    />
                )}
                rules={{required: true}}
                name={'price'}
            />
            {errors.price?.type && <Text>This field must be number</Text>}
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <CustomInput
                        label={'Image'}
                        placeholder={'Image Link'}
                        onChange={onChange}
                        value={value}
                    />
                )}
                rules={{required: true}}
                name={'image'}
            />
            <CustomButton label='Submit'  colorCode='#ff2bfa' onPress={handleSubmit(onSubmit)}/>
        </View>
    )
}


const styles=StyleSheet.create({
    root:{
        flexDirection:'column',
        flex: 1
    },
})

export default ProductsAction;
