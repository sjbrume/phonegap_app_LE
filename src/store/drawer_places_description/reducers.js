
export const DRAWER_PLACES_DESCRIPTION_TOGGLE = 'DRAWER_PLACES_DESCRIPTION_TOGGLE';
export const drawer_places_description  = (state = {}, action) => {
    switch (action.type) {
        case DRAWER_PLACES_DESCRIPTION_TOGGLE: {
            return action.payload
        }
        default:
            return state;
    }
}