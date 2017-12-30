import {MAP_CLUSTERING_LOAD} from "./action_types";

export const map = (state = {}, action) => {
    switch (action.type) {
        case MAP_CLUSTERING_LOAD: {
            console.log();
            console.log(MAP_CLUSTERING_LOAD,action);
            return Object.assign({}, state, {
                clustering: action.payload
            })
        }
        default:
            return state;
    }
}
