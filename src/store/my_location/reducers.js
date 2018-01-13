import {SET_MY_LOCATION} from "./action_types";

export const my_location = (state = {}, action) => {
    switch (action.type) {
        case SET_MY_LOCATION: {
            console.log(SET_MY_LOCATION,action);
            return action.payload
        }
        default:
            return state;
    }
};