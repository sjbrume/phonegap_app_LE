import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intl} from './intl/reducers';
import {menuPosition} from "./menu-position/reducers";

export const rootReducer = combineReducers({
    form: formReducer,
    intl,
    menuPosition,
});