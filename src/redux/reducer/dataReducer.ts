import {FETCH_PRODUCTS,PUSH_DATA,DELETE_DATA,PENDING} from "../action/loadingDataAction";

const initialValue = {
    products:[],
    pending:false,
    error:null,
};

export default function DataReducer(state = initialValue, action: any) {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {
                pending: false,
                products: action.payload
            }
        case PUSH_DATA:
            return {
                pending: false,
                products: action.payload
            }
        case DELETE_DATA:
            return {
                pending: false,
                products: action.payload
            }
        case PENDING:
            return {
                products: [],
                pending: true
            }
        default:
            return state;
    }
}

