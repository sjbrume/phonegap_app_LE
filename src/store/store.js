import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './reducers';
import {UKR} from "./intl/action_types";
import {MENU_LEFT, MENU_BOTTOM} from "./menu-position/action_types";

let createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const initialState = localStorage.getItem('reduxState') ?
    Object.assign({},
        JSON.parse(localStorage.getItem('reduxState')), {
            form: {},
            my_location: {
                lat: null,
                lng: null,
            },
            complaints_map: false,

            info_dialog: {
                toggle: true,
                loading: false,
                success: false,
                error: false
            },
            menu_toggle: false,
            map: {
                clustering: true,
                filter: 'alcohol',
                address_info: [],
                center: {
                    lat: null,
                    lng: null,
                },
            },
        }) : {
        intl: UKR,
        menuPosition: MENU_BOTTOM,
        my_location: {
            lat: null,
            lng: null,
        },
        complaints_map: false,

        info_dialog: {
            toggle: true,
            loading: false,
            success: false,
            error: false
        },
        menu_toggle: false,
        map: {
            clustering: true,
            filter: 'alcohol',
            address_info: [],
            center: {
                lat: null,
                lng: null,
            },
        },
        websql: {
            search_result: {
                lat: null,
                lng: null,
            },
            list_of_places: [],
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
Store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(Store.getState()))
});
export {Store};
