
export const COMPLAINTS_MAP_TOGGLE = 'COMPLAINTS_MAP_TOGGLE';

export const complaints_map = (state = {}, action) => {
    switch (action.type) {
        case COMPLAINTS_MAP_TOGGLE: {
            console.log(COMPLAINTS_MAP_TOGGLE,action);
            return action.payload
        }
        default:
            return state;
    }
}