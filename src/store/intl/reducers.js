import {CHANGE_LANG} from "./action_types";
import {BrowserHistory as history} from '../../history';

export const intl = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_LANG: {
            // Добавляет куки с языком
            if (process.env.BROWSER) {
                const maxAge = 3650 * 24 * 3600; // 10 years in seconds
                document.cookie = `lang=${action.payload};path=/;max-age=${maxAge}`;
                history.push(`?lang=${action.payload}`);
            }

            return action.payload
        }
        default:
            return state;
    }
}
