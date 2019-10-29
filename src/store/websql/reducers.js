import {
    WEBSQL_DB_LOADING,
    WEBSQL_DB_CREATE,
    WEBSQL_DB_ERROR_CREATE,
    WEBSQL_DB_SUCCESS_CREATE,

    WEBSQL_DOWNLOAD_DATA_ERROR,
    WEBSQL_DOWNLOAD_DATA_LOADING,
    WEBSQL_DOWNLOAD_DATA_SUCCESS,


    WEBSQL_SET_DATA_ERROR,
    WEBSQL_SET_DATA_LOADING,
    WEBSQL_SET_DATA_SUCCESS,

    WEBSQL_VERSION_DB_ERROR,
    WEBSQL_VERSION_DB_LOADING,
    WEBSQL_VERSION_DB_SET,
    WEBSQL_VERSION_DB_SUCCESS,
    WEBSQL_LIST_OF_PLACES_GET,
} from "./action_types";

export const websql = (state = {}, action) => {
    switch (action.type) {

        case WEBSQL_LIST_OF_PLACES_GET: {
            console.log(WEBSQL_LIST_OF_PLACES_GET, action.payload);
            return Object.assign({}, state, {
                list_of_places: action.payload
            })
        }
        case WEBSQL_SET_DATA_LOADING: {
            console.log(WEBSQL_SET_DATA_LOADING, action.payload);
            return Object.assign({}, state, {
                set: {
                    ...state.set,
                    loading: action.payload
                }
            })
        }
        case WEBSQL_SET_DATA_SUCCESS: {
            console.log(WEBSQL_SET_DATA_SUCCESS, action.payload);
            return Object.assign({}, state, {
                set: {
                    ...state.set,
                    success: action.payload
                }
            })
        }
        case WEBSQL_SET_DATA_ERROR: {
            console.log(WEBSQL_SET_DATA_ERROR, action.payload);
            return Object.assign({}, state, {
                set: {
                    ...state.set,
                    error: action.payload
                }
            })
        }

        case WEBSQL_DB_CREATE: {
            console.log(WEBSQL_DB_CREATE, action.payload);
            return Object.assign({}, state, {
                db: {
                    ...state.db,
                    db: action.payload
                }
            })
        }
        case WEBSQL_DB_LOADING: {
            console.log(WEBSQL_DB_LOADING, action.payload);
            return Object.assign({}, state, {
                db: {
                    ...state.db,
                    loading: action.payload
                }
            })
        }
        case WEBSQL_DB_ERROR_CREATE: {
            console.log(WEBSQL_DB_ERROR_CREATE, action.payload);
            return Object.assign({}, state, {
                db: {
                    ...state.db,
                    error: action.payload
                }
            })
        }
        case WEBSQL_DB_SUCCESS_CREATE: {
            console.log(WEBSQL_DB_SUCCESS_CREATE, action.payload);
            return Object.assign({}, state, {
                db: {
                    ...state.db,
                    success: action.payload
                }
            })
        }


        case WEBSQL_VERSION_DB_SET: {
            console.log(WEBSQL_VERSION_DB_SET, action.payload);
            return Object.assign({}, state, {
                version: {
                    ...state.version,
                    version: action.payload
                },
            })
        }
        case WEBSQL_VERSION_DB_SUCCESS: {
            console.log(WEBSQL_VERSION_DB_SUCCESS, action.payload);
            return Object.assign({}, state, {
                version: {
                    ...state.version,
                    error: false,
                    success: action.payload
                },
            })
        }
        case WEBSQL_VERSION_DB_ERROR: {
            console.log(WEBSQL_VERSION_DB_ERROR, action.payload);
            return Object.assign({}, state, {
                version: {
                    ...state.version,
                    error: action.payload
                },
            })
        }
        case WEBSQL_VERSION_DB_LOADING: {
            console.log(WEBSQL_VERSION_DB_LOADING, action.payload);
            console.log(state);
            return Object.assign({}, state, {
                version: {
                    ...state.version,
                    loading: action.payload
                },
            })
        }


        case WEBSQL_DOWNLOAD_DATA_LOADING: {
            console.log(WEBSQL_DOWNLOAD_DATA_LOADING, action.payload);
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    loading: action.payload
                },
            })
        }
        case WEBSQL_DOWNLOAD_DATA_SUCCESS: {
            console.log(WEBSQL_DOWNLOAD_DATA_SUCCESS, action.payload);
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    success: action.payload
                },
            })
        }
        case WEBSQL_DOWNLOAD_DATA_ERROR: {
            console.log(WEBSQL_DOWNLOAD_DATA_ERROR, action.payload);
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    error: action.payload
                },
            })
        }
        default:
            return state;
    }
}
