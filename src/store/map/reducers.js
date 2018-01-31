import {MAP_CLUSTERING_FILTER, MAP_CLUSTERING_LOAD,MAP_GET_ADDRESS_INFO,MAP_SET_CENTER} from "./action_types";



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

        case MAP_GET_ADDRESS_INFO: {
            console.log(MAP_GET_ADDRESS_INFO,action);
            return Object.assign({}, state, {
                address_info: action.payload
            })
        }
        case MAP_SET_CENTER: {
            console.log(MAP_SET_CENTER,action);
            return Object.assign({}, state, {
                center: action.payload
            })
        }
        default:
            return state;
    }
}
