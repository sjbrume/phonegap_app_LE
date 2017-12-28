
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension';
import {rootReducer} from './reducers';
import {UKR} from "./intl/action_types";
import {MENU_LEFT} from "./menu-position/action_types";

let createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {
    intl: UKR,
    menuPosition: MENU_LEFT,
    websql: {
        search_result: null,
        list_of_places:[],
        db: {
            db: null,
            loading: false,
            error: false,
            success: false,
        },
        set: {
            loading: false,
            error: false,
            success: false,
        },
        data: {
            loading: false,
            error: false,
            success: false,
        },
        version: {
            version: null,
            loading: false,
            error: false,
            success: false,
        }
    }
};

const Store = createStoreMiddleware(
    rootReducer,
    initialState,
    composeWithDevTools(),
);
// Store.subscribe(()=>{
//     localStorage.setItem('reduxState', JSON.stringify(Store.getState()))
// });
export {Store};
