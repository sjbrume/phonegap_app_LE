
export const MENU_TOGGLE = 'MENU_TOGGLE';
// TODO: управление открытием и закрытием меню
export const menu_toggle = (state = {}, action) => {
    switch (action.type) {
        case MENU_TOGGLE: {
            console.log(MENU_TOGGLE,action);
            return action.payload
        }
        default:
            return state;
    }
}