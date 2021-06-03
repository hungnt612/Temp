import React, {useContext} from "react";
import {Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native'
import CustomButton from "../CustomButton";
import {UserContext} from "../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from "../redux/store";
import authenticateReducer from "../redux/reducer/authenticateReducer";
import {logout} from "../redux/action/authenticateAction";


const Home: React.FC<{userdata: any, Login: (data: any) => void}> = ({userdata, Login}) => {

    console.log(userdata)
    const navigation = useNavigation();

    const userlogout = () => {
        AsyncStorage.removeItem('UserData').then(() => {
            logout();
            console.log(store.getState().authenticateReducer)
        })
    }

    return (
        <View>
            <Text>This is home</Text>
            <Text onPress={() => navigation.navigate('User')}>my name is {store.getState().authenticateReducer.name} </Text>
            <CustomButton label={'Logout'} colorCode={'red'} onPress={userlogout}/>
        </View>
    )
}

export default Home;
