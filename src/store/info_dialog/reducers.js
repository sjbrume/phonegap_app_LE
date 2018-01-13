import {INFO_DIALOG_TOGGLE} from "./action_types";

export const info_dialog = (state = {}, action) => {
    switch (action.type) {
        case INFO_DIALOG_TOGGLE: {
            console.log(INFO_DIALOG_TOGGLE,action);
            return action.payload
        }
        default:
            return state;
    }
}