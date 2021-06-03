import {LOGIN,LOGOUT} from "../action/authenticateAction";

const initialValue = {
    userName:'',
    password:'',
};

export default function authenticateReducer(state = initialValue, action: any) {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case LOGOUT:
            return initialValue;
        default:
            return state;
    }
}
