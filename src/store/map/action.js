



import {TABLE_NAME} from "../../config";
import {MAP_DUPLICATE_POSITION} from "./action_types";

export const getDuplicateAddress = (store, arrayID) => {
    console.log('getDuplicateAddress: ',store);
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
                    dispatch({type: MAP_DUPLICATE_POSITION, payload: sqlResultSet.rows});

                }, (sqlTransaction, sqlEerror) => {
                    console.log(sqlTransaction, sqlEerror);
                })
        })

    }

}