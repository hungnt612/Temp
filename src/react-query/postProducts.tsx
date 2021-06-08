import {useQuery} from "react-query";
import axios from "axios";
import {baseUrl} from "../constant";
import {ActivityIndicator, Alert} from "react-native";
import {QueryProducts} from "./queryProducts";
import {useMutation,useQueryClient} from "react-query";
import React from "react";
import {matchMutation} from "react-query/types/core/utils";


export const AddProduct2=(productName,price,image)=>{
    const url = `${baseUrl}products`;

    const mutation=useMutation(data=>axios.post(url,data),{
        onSuccess:()=>{
            console.log('hihi')
        },
        onError:()=>{
            console.log('erro')
        }
    })
    if (mutation.isLoading){
        console.log('loaddddd')
    }
    mutation.mutate({productName:productName, price:price, image: image})
}
