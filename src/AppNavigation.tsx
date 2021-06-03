import React, {createContext, useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screen/Login';
import Survey from './screen/survey';
import Survey2 from './screen/survey2';
import Answers from './screen/Answers';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from './context/UserContext';
import Home from './screen/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, Provider} from 'react-redux';
import store from './redux/store';
import {login} from "./redux/action/authenticateAction";
import LoginScreen from "./screen/Login";
const Stack = createStackNavigator();
import ProductsList from "./screen/productsList";
import PushData from "./screen/pushData";

const AppNavigation: React.FC<{userdata: any, Login: (data: any) => void}> = ({userdata, Login}) => {


//////////
//     useEffect(()=>{
//         AsyncStorage.getItem('UserData').then(value => {
//             const data = JSON.parse(value);
//             store.dispatch(login(data));
//             console.log(data);
//         }).catch(e=>console.log(e));
//     })
    console.log(store.getState())
    const isLogin=store.getState().authenticateReducer?.name;
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {/*{isLogin? (*/}
          {/*    <Stack.Screen name="Home" component={Home} />*/}
          {/*) : (*/}
          {/*  <>*/}
          {/*      <Stack.Screen name="Login" component={LoginScreen} />*/}
          {/*  </>*/}
          {/*)}*/}
            <Stack.Screen name="ProductsList" component={ProductsList}></Stack.Screen>
            <Stack.Screen name="PushData" component={PushData}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  );
};


const mapStateToProps = (state: any) => {
    const {authenticateReducer} = state;
    return {userdata: authenticateReducer};
};


export default connect(mapStateToProps, {Login: login})(AppNavigation);


