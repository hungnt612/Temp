import {Dispatch} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';



export const login = (data: any) => (dispatch: Dispatch)=>{
    AsyncStorage.setItem('UserData',JSON.stringify(data)).then(()=>{
        dispatch({
            type: LOGIN,
            payload: data,
        })
    });
}

export const logout = () => ({
    type: LOGOUT,
})
