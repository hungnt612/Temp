import React, {useContext,useEffect,useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    Modal,
    Pressable, SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from '@react-navigation/native'
import CustomButton from "../CustomButton";
import {UserContext} from "../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../redux/store";
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from "../CustomInput";
import {login} from "../redux/action/authenticateAction";
import {connect, Provider} from 'react-redux';
import {useDispatch,useSelector} from "react-redux";
import {GetData,Delete_Data} from "../redux/action/loadingDataAction";
import DataReducer from "../redux/reducer/dataReducer";

const baseUrl='https://react-native-server-cuong.herokuapp.com/stores/';
const {width, height} = Dimensions.get('window');

const schema = yup.object().shape({
    productName: yup.string().required(),
    price: yup.number().required(),
    name:yup.string().required(),
    address:yup.string().required(),
});

interface IFormInputs {
    productName: string;
    price: number;
    image:string;
    id:string;
    name:string;
    address:string;
}

const ProductsList: React.FC = () => {
    const navigation = useNavigation();
    const reducer=useSelector((state:any)=>state?.DataReducer);
    const {products, pending}=reducer;
    const dispath=useDispatch();


    useEffect(()=>{
        dispath(GetData());
    },[]);

    const [DATA,setDATA]=useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    // const HotReload=()=>{
    //     const url=`https://60af93285b8c300017ded298.mockapi.io/products`;
    //     const options={
    //         method:'GET',
    //     }
    //     fetch(url, options).then(response=>response.json()).then(data=>setDATA(data))
    // }

    const submit = (data: any) => {
        console.log(data)
        try {
            console.log(data)
            fetch(`${baseUrl}`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                }).then(dispath(GetData()))
                .catch((error) => {
                    console.error('Error:', error);
                });
            setModalVisible(!modalVisible)
        } catch (e) {
            console.log(e);
        }
    };

    // useEffect(
    //     ()=>{
    //         const url=`https://60af93285b8c300017ded298.mockapi.io/products`;
    //         const options={
    //             method:'GET',
    //         }
    //         fetch(url, options).then(response=>response.json()).then(data=>setDATA(data))
    //     },[]
    // )

    //console.log(DATA);
    const deleteMethod = {
        method: 'DELETE', // Method itself
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content
        },
        // No need to have body, because we don't send nothing to the server.
    };



    const Item=({id,name,address})=>(
        // <View style={styles.itemContainer}>
        //
        //     <View style={styles.titleContainer}>
        //         <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        //             {name}
        //         </Text>
        //     </View>
        //     <View style={styles.priceContainer}>
        //         <View style={styles.delete}>
        //             <Text style={styles.price}>{address}</Text>
        //             <TouchableOpacity onPress={()=>{
        //                 const url=`https://60af93285b8c300017ded298.mockapi.io/products/${(id)}`;
        //                 console.log((id).toString())
        //                 fetch(url, deleteMethod)
        //                     .then(response => response.json())
        //                     .then(data => console.log(`data: ${data}`)) // Manipulate the data retrieved back, if we want to do something with it
        //                     .catch(err => console.log(`error: ${err}`)) // Do something with the error
        //             }}>
        //                 <Text style={styles.btnDelete}>Delete</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // </View>
        <View style={styles.danhangngang}>
            <Text>{id}</Text>
            <Text>{name}</Text>
            <Text>{address}</Text>
                        <TouchableOpacity onPress={()=>{dispath(Delete_Data({id})); dispath(GetData())}}>
                             <Text style={styles.btnDelete}>Delete</Text>
                         </TouchableOpacity>
        </View>
    );

    const renderItem=({item})=>(
        <Item id={item.id} name={item.name} address={item.address}>
        </Item>
);

    const userlogout = () => {
        // AsyncStorage.removeItem('UserData').then(() => {
        //     console.log(store.getState().authenticateReducer)
        // })
    }
    if (pending) return <ActivityIndicator size={50} color={'pink'}/>
    return (
        <SafeAreaView>
        <View style={styles.root}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
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
                        {errors.name && <Text>This is required and must be numberic.</Text>}
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
                            name={'address'}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleSubmit(submit)}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={()=>{setModalVisible(!modalVisible)}}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.btnContainer}>
            <CustomButton label={'Add product'} colorCode={'orange'} onPress={() => navigation.navigate('PushData')}/>
            </View>
            <View style={styles.test}>
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={1}
                />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({

    danhangngang:{
        flexDirection:'row',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        //margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical:10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },


    root:{
        flexDirection:'column',
    },
    delete:{
        flexDirection:'row',
    },
    btnDelete:{
        alignSelf:'flex-end',
        marginLeft:50,
    },
    listContainer:{
        flex:1,
    },
    btnContainer:{
        backgroundColor:'red',
    },
    test:{
        marginBottom:240,
        backgroundColor:"blue",
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



export default (ProductsList);

