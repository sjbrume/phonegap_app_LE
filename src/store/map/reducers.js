import {MAP_CLUSTERING_FILTER, MAP_CLUSTERING_LOAD} from "./action_types";

export const map = (state = {}, action) => {
    switch (action.type) {
        case MAP_CLUSTERING_LOAD: {
            console.log(MAP_CLUSTERING_LOAD,action);
            return Object.assign({}, state, {
                clustering: action.payload
            })
        }
        case MAP_CLUSTERING_FILTER: {
            console.log(MAP_CLUSTERING_FILTER,action);
            return Object.assign({}, state, {
                filter: action.payload
            })
        }
        default:
            return state;
    }
}
