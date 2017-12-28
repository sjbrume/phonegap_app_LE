export const fetch_article = store => next => async action => {

    if (action.type !== '') {
        return next(action);
    }

}