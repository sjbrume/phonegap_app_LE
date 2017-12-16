
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {UKR} from "./intl/action_types";

let createStoreMiddleware = applyMiddleware(thunk)(createStore);
const initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {
    intl: UKR
};

const Store = createStoreMiddleware(
    rootReducer,
    initialState,
    composeWithDevTools(),
);
Store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(Store.getState()))
});
export {Store};
