import React from "react";
import {Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from "react-native";
import {useRoute} from '@react-navigation/native';
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {GetData, Push_Data} from "../redux/action/loadingDataAction";
import {useDispatch,useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native'


const schema = yup.object().shape({
    name:yup.string().required(),
    address:yup.string().required(),
});

interface IFormInputs {
    id:string;
    name:string;
    address:string;
}



const PushData: React.FC = () => {
    const navigation = useNavigation();
    const reducer=useSelector((state:any)=>state?.DataReducer);
    const {products, pending,error}=reducer;
    console.log(products)
    const dispath=useDispatch();

    const submit = (data: any) => {
        console.log(pending);
        dispath(Push_Data(data));

        if (pending==false){
            Alert.alert(
                "Them nua hay khong",
                `sp vua them ${data}`,
                [
                    {
                        text: "khong",
                        onPress: () => {navigation.goBack()},
                        style: "cancel"
                    },
                    { text: "co", onPress: () => console.log("OK Pressed") }
                ])
        }
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });
    if (pending) return <ActivityIndicator size={50} color={'red'}/>
    return (
        <SafeAreaView>
            <View style={styles.root}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add new product</Text>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <CustomInput
                                        label={'id'}
                                        placeholder={'id'}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                                rules={{required: true}}
                                name={'id'}
                            />
                            {errors.id && <Text>This is required.</Text>}
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <CustomInput
                                        label={'name'}
                                        placeholder={'name'}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                                rules={{required: true}}
                                name={'name'}
                            />
                            {errors.name && <Text>This is required.</Text>}
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <CustomInput
                                        label={'address'}
                                        placeholder={'address'}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                                rules={{required:true}}
                                name={'address'}
                            />
                            {errors.address && <Text>This is required.</Text>}
                            <View style={styles.btnContainer}>
                                <CustomButton label={'Add product'} colorCode={'orange'} onPress={handleSubmit(submit)}/>
                            </View>
                            <View style={styles.btnContainer}>
                                <CustomButton label={'Cancel'} colorCode={'orange'} onPress={() => navigation.navigate('ProductsList')}/>
                            </View>
                        </View>
                    </View>

            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({})

export default PushData;
