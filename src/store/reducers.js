import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {intl} from './intl/reducers';
import {menuPosition} from "./menu-position/reducers";
import {websql} from "./websql/reducers";
import {map} from './map/reducers';
import {my_location} from "./my_location/reducers";
import {info_dialog} from "./info_dialog/reducers";
import {menu_toggle} from "./menu_toggle/reducer";
import {complaints_map} from "./complaints_map/reducer";
import {drawer_places_description} from "./drawer_places_description/reducers";


export const FORM_ADD_LATLNG = 'FORM_ADD_LATLNG';
export const FORM_REMOVE_LATLNG = 'FORM_REMOVE_LATLNG';

const FormComplaints = (state, action) => {
    switch (action.type) {
        case FORM_ADD_LATLNG:
            console.log(FORM_ADD_LATLNG, state, action);
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
};

export const rootReducer = combineReducers({
    form: formReducer.plugin({
        FormComplaints: (state, action) => {
            switch (action.type) {
                case FORM_ADD_LATLNG:
                    console.log(FORM_ADD_LATLNG, state, action);
                    return Object.assign({}, state, {
                        values: {
                            ...state.values,
                            ...action.payload,
                        }
                    });
                case FORM_REMOVE_LATLNG:
                    console.log(FORM_REMOVE_LATLNG, state, action);
                    return Object.assign({}, state, {
                        values: {
                            ...action.payload,
                        }
                    });
                default:
                    return state
            }
        }
    }),
    my_location,
    info_dialog,
    menu_toggle,
    complaints_map,
    drawer_places_description,
    intl,
    menuPosition,
    websql,
    map
});