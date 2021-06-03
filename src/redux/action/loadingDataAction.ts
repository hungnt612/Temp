import {Dispatch} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOGIN} from "./authenticateAction";

export const FETCH_PRODUCTS='FETCH_PRODUCTS';
export const PUSH_DATA='PUSH_DATA';
export const DELETE_DATA='DELETE_DATA';
export const PENDING='PENDING'

export const GetData = () => (dispatch: Dispatch)=>{
    dispatch({
        type: PENDING,
    });
    const url=`https://60af93285b8c300017ded298.mockapi.io/data`;
    const options={
        method:'GET',
    }
    fetch(url, options).then(response=>response.json()).then(data=>{
        dispatch({
            type: FETCH_PRODUCTS,
            payload: data,
        })
    }).catch(e=>console.log(e))
}

export const Push_Data = (data: any) => (dispatch: Dispatch)=>{
    dispatch({
        type: PENDING,
    });
    try {
        console.log(data)
        fetch(`https://60af93285b8c300017ded298.mockapi.io/data`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            }).then(()=>{
            dispatch({
                type: PUSH_DATA,
            })
            dispatch(GetData())
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (e) {
        console.log(e);
    }
}

export const Delete_Data=(data: any) => (dispatch: Dispatch)=>{
    dispatch({
        type: PENDING,
    });
    const url=`https://60af93285b8c300017ded298.mockapi.io/data/${data.id.toString()}`;
    console.log((data.id))
    fetch(url, {
        method: 'DELETE', // or 'PUT'
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }}).then(response => response.json())
        .then(data => console.log(`data: ${data}`)).then(()=>{
        dispatch({
            type: DELETE_DATA,
            payload: data,
        })}) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(`error: ${err}`)) // Do something with the error
}
