import {useQuery} from "react-query";
import axios from "axios";
import {baseUrl} from "../constant";

export const QueryProducts = () => {
    const url = `${baseUrl}products`;
    return useQuery('products', () => axios.get(url))
}
