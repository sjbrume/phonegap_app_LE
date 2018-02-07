import {INFO_DIALOG_GET_DATA_FAIL, INFO_DIALOG_GET_DATA_START, INFO_DIALOG_GET_DATA_SUCCESS} from "./action_types";

export const getStatistic = () => {
    return (dispatch) => {
        dispatch({type: INFO_DIALOG_GET_DATA_START, payload: true});

        // setTimeout(() => {
        //     dispatch({
        //         type: INFO_DIALOG_GET_DATA_SUCCESS, payload: {
        //             alcohol_count: 6884,
        //             tobacco_count: 5801,
        //             alcohol_tobacco_count: 13028,
        //             without_license_count: 13149,
        //         }
        //     });
        // }, 10000)

        let xhr = new XMLHttpRequest;
        xhr.onload = function () {
            // console.log(JSON.parse(xhr.responseText));
            dispatch({type: INFO_DIALOG_GET_DATA_SUCCESS, payload: JSON.parse(xhr.responseText)});

        };
        xhr.onerror = function () {
            dispatch({
                type: INFO_DIALOG_GET_DATA_FAIL, payload: {
                    alcohol_count: '',
                    tobacco_count: '',
                    alcohol_tobacco_count: '',
                    without_license_count: '',
                }
            });
        };
        xhr.open('GET', 'http://185.25.117.8/statistic/global');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(null)

    }
}