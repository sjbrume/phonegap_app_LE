



import {TABLE_NAME} from "../../config";
import {MAP_GET_ADDRESS_INFO} from "./action_types";

export const getAddressInfo = (store, arrayID) => {
    console.log('getAddressInfo: ',store);
    console.log(arrayID);
    return (dispatch) => {
        let searchParam = '';
        let arrayLength = arrayID.length;
        for(let i = 0; i< arrayLength; i++){
            if(i < arrayLength - 1 ){
                searchParam += ` id = ${arrayID[i]} OR`;
            } else {
                searchParam += ` id = ${arrayID[i]};`;
            }
        }
        console.log(searchParam);
        const query = `SELECT * FROM ${TABLE_NAME} WHERE ${searchParam}`;
        console.log(query);
        store.websql.db.db.transaction((tx) => {
            tx.executeSql(query,
                [],
                (sqlTransaction, sqlResultSet) => {
                    console.log(sqlResultSet.rows);
                    dispatch({type: MAP_GET_ADDRESS_INFO, payload: sqlResultSet.rows});

                }, (sqlTransaction, sqlEerror) => {
                    console.log(sqlTransaction, sqlEerror);
                })
        })

    }

}