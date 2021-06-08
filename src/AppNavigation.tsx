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
import Products_List from "./screen/products_list_react_query";
import PushData from "./screen/pushData";
import ProductsAction from "./screen/edit_products_list_react_query";
import ProductDetail from "./screen/productDetail";

const Stack = createStackNavigator();
// const AppNavigation: React.FC<{userdata: any, Login: (data: any) => void}> = ({userdata, Login}) => {
const AppNavigation: React.FC = () => {

//////////
//     useEffect(()=>{
//         AsyncStorage.getItem('UserData').then(value => {
//             const data = JSON.parse(value);
//             store.dispatch(login(data));
//             console.log(data);
//         }).catch(e=>console.log(e));
//     })
//     console.log(store.getState())
//     const isLogin=store.getState().authenticateReducer?.name;
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
            <Stack.Screen name="Products_List" component={Products_List} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="ProductsAction" component={ProductsAction} options={{ title:"hihi"}}></Stack.Screen>
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  );
};


// const mapStateToProps = (state: any) => {
//     const {authenticateReducer} = state;
//     return {userdata: authenticateReducer};
// };

//
// export default connect(mapStateToProps, {Login: login})(AppNavigation);
export default AppNavigation;

