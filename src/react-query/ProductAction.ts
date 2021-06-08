import {useQuery} from "react-query";
import axios from "axios";
import {baseUrl} from "../constant";
import {ActivityIndicator, Alert} from "react-native";
import {QueryProducts} from "./queryProducts";
import {useMutation,useQueryClient} from "react-query";
import React from "react";
import {matchMutation} from "react-query/types/core/utils";
import {RenewCache} from "./renewCache";


export const AddProduct = (data:any) => {
    console.log(data)
    const url = `${baseUrl}products`;
    axios.post(url, data)
        .then(response => {console.log(response);
            if (response.status!=201){
                Alert.alert(
                    "Loi roi nha",
                    `Code: ${response.status}`,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }else {
                Alert.alert(
                    "Them san pham thanh cong",
                    `Code: ${response.status}`,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }).then()
        .catch(err => console.log(err))
    console.log(data)
}


export const DeleteProduct = (id:any) => {
    const url = `${baseUrl}products/${id}`;
    axios.delete(url,{id}).then(response => {console.log(response.status);
        if (response.status==200){
            Alert.alert(
                "Xoa san pham thanh cong",
                `Code: ${response.status}`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }).catch(err => {Alert.alert(
        "Xoa san pham khong thanh cong",
        `${err}`,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );})
}
