
import {CHANGE_MENU} from "./action_types";

export const menuPosition = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_MENU: {
            return action.payload
        }
        default:
            return state;
    }
}