import {
    INFO_DIALOG_TOGGLE,
    INFO_DIALOG_GET_DATA_START,
    INFO_DIALOG_GET_DATA_SUCCESS,
    INFO_DIALOG_GET_DATA_FAIL,
} from "./action_types";

export const info_dialog = (state = {}, action) => {
    console.log('info_dialog:', state);
    switch (action.type) {
        case INFO_DIALOG_TOGGLE: {
            console.log(INFO_DIALOG_TOGGLE, action);
            return  Object.assign({}, state, {
                toggle: action.payload
            })
        }
        case INFO_DIALOG_GET_DATA_START: {
            console.log(INFO_DIALOG_GET_DATA_START, action);
            console.log(state);
            return Object.assign({}, state, {
                loading: action.payload,
                error: null,
                success: null,
            })
        }
        case INFO_DIALOG_GET_DATA_SUCCESS: {
            console.log(INFO_DIALOG_GET_DATA_SUCCESS, action);
            return Object.assign({}, state, {
                loading: null,
                error: null,
                success: action.payload,
            })
        }
        case INFO_DIALOG_GET_DATA_FAIL: {
            console.log(INFO_DIALOG_GET_DATA_FAIL, action);

            return Object.assign({}, state, {
                loading: null,
                error: action.payload,
                success: null,
            })
        }
        default:
            return state;
    }
}