import {combineReducers} from 'redux';

import answerReducer from "./answerReducer";
import authenticateReducer from "./authenticateReducer";
import DataReducer from "./dataReducer";

export default combineReducers({authenticateReducer,answerReducer,DataReducer});
