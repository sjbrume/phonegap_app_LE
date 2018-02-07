import {
    WEBSQL_DB_CREATE, WEBSQL_DOWNLOAD_DATA_ERROR, WEBSQL_DOWNLOAD_DATA_LOADING, WEBSQL_DOWNLOAD_DATA_SUCCESS,
    WEBSQL_DB_ERROR_CREATE,
    WEBSQL_DB_LOADING, WEBSQL_SET_DATA_ERROR, WEBSQL_SET_DATA_LOADING, WEBSQL_SET_DATA_SUCCESS,
    WEBSQL_DB_SUCCESS_CREATE,
    WEBSQL_VERSION_DB_ERROR,
    WEBSQL_VERSION_DB_LOADING, WEBSQL_VERSION_DB_SET,
    WEBSQL_VERSION_DB_SUCCESS,
} from "./action_types";
import {DATA_URL, DB_VERSION_URL, DROP_TABLE, HARD_CODE_MODE, TABLE_NAME, TIMEOUT} from "../../config";


// TODO: это для бесконечного скрола на будующее
// const list_places = (state) => {
//     return (dispatch) => {
//
//         const MIN = state.websql.list_of_places.length;
//         const MAX = state.websql.list_of_places.length + STEP;
//         const OLD_LIST = state.websql.list_of_places;
//
//         state.websql.db.db.transaction((tx) => {
//             tx.executeSql(`SELECT *
//                            FROM ${TABLE_NAME}
//                            WHERE ID > ? AND ID < ?`,
//                 [MIN, MAX],
//                 (sqlTransaction, sqlResultSet) => {
//                     console.log(sqlTransaction, sqlResultSet);
//                     dispatch({type: WEBSQL_LIST_OF_PLACES_GET, payload: [...OLD_LIST, ...sqlResultSet.rows]})
//                 }, (sqlTransaction, sqlEerror) => {
//                     console.log(sqlTransaction, sqlEerror);
//                     // reject(sqlEerror);
//                 });
//         });
//
//     };
// };

// Function:
//  Создание базы данных
// Returns:
//  Функци обратного вызова
// Parameters:
//  version - версия базы данных
const create_db = (version) => {
    console.log(version);

    return (dispatch) => {
        console.log('update_db');
        dispatch({type: WEBSQL_DB_LOADING, payload: true});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const DB = window.openDatabase(version, version, '', 40 * 1024 * 1024);
                    create_table_db(DB);
                    dispatch({type: WEBSQL_DB_CREATE, payload: DB});
                    dispatch({type: WEBSQL_DB_LOADING, payload: false});
                    // dispatch(list_places());
                    resolve(DB);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            }, TIMEOUT);
        })
    }
};
// Function:
//  Создание таблицы в базе данных
// Returns:
//  Ничего
// Parameters:
//  DB - экземпляр базы данных
const create_table_db = (DB) => {

    DB.transaction(function (tx) {
        if (DROP_TABLE) {
            tx.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
            tx.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
        }
        // tx.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
        // tx.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
        console.log('create_table_db');
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
              id               INTEGER,
              region_id        INTEGER,
              id_code          TEXT,
              address          TEXT,
              lng              REAL,
              lat              REAL,
              license          TEXT,
              company          TEXT,
              company_type     TEXT,
              license_start_at TEXT,
              license_end_at   TEXT,
              license_type     TEXT,
              status           TEXT
            )`, [],
            (sqlTransaction, sqlResultSet) => {
                console.log(sqlResultSet);
            },
            (sqlTransaction, sqlError) => {
                console.error('create_table_db: ', sqlError);

            });
    });

};
// Function:
//  Запись в базу анных
// Returns:
//  Возвращает Функцию обратного вызова
// Parameters:
//  DB - экземпляр базы данных
//  data - массив данных для базы
const set_db = (DB, data) => {
    return (dispatch) => {
        dispatch({type: WEBSQL_SET_DATA_LOADING, payload: true});
        setTimeout(() => {
            try {

                DB.transaction(async (tx) => {
                    let promises = [];

                    tx.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`, [],
                        (sqlTransaction, sqlResultSet) => {
                            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                                  id               INTEGER,
                                  region_id        INTEGER,
                                  id_code          TEXT,
                                  address          TEXT,
                                  lng              REAL,
                                  lat              REAL,
                                  license          TEXT,
                                  company          TEXT,
                                  company_type     TEXT,
                                  license_start_at TEXT,
                                  license_end_at   TEXT,
                                  license_type     TEXT,
                                  status           TEXT
                                )`, [],
                                (sqlTransaction, sqlResultSet) => {
                                    console.log(sqlResultSet);
                                    data.map(item => {
                                        let {
                                            id,
                                            region_id,
                                            id_code,
                                            address,
                                            lng,
                                            lat,
                                            license,
                                            company,
                                            company_type,
                                            license_start_at,
                                            license_end_at,
                                            license_type,
                                            status,
                                        } = item;
                                        promises.push(
                                            new Promise((resolve, reject) => {
                                                tx.executeSql(`INSERT INTO ${TABLE_NAME} (
                                                      id,
                                                      region_id,
                                                      id_code,
                                                      address,
                                                      lng,
                                                      lat,
                                                      license,
                                                      company,
                                                      company_type,
                                                      license_start_at,
                                                      license_end_at,
                                                      license_type,
                                                      status
                                                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                    [id,
                                                        region_id,
                                                        id_code,
                                                        address,
                                                        lng,
                                                        lat,
                                                        license,
                                                        company,
                                                        company_type,
                                                        license_start_at,
                                                        license_end_at,
                                                        license_type,
                                                        status],
                                                    (sqlTransaction, sqlResultSet) => {
                                                        resolve(sqlResultSet)
                                                    },
                                                    (sqlTransaction, sqlError) => {
                                                        reject(sqlError)
                                                    })
                                            })
                                        )
                                    });
                                },
                                (sqlTransaction, sqlError) => {
                                    console.error('create_table_db: ', sqlError);
                                });
                        },
                        (sqlTransaction, sqlError) => {
                            console.error('create_table_db: ', sqlError);
                        });


                    Promise.all(promises).then(value => {
                        console.log('Promise.all', value);
                        dispatch({type: WEBSQL_SET_DATA_LOADING, payload: false});
                        dispatch({type: WEBSQL_SET_DATA_SUCCESS, payload: true});
                    }, error => {
                        console.error('Promise.all', error);
                        dispatch({type: WEBSQL_SET_DATA_LOADING, payload: false});
                        dispatch({type: WEBSQL_SET_DATA_ERROR, payload: true});
                    });


                });


            } catch (err) {
                console.error(err);
                dispatch({type: WEBSQL_SET_DATA_ERROR, payload: true});
            }
        }, TIMEOUT);
    }
};
// Function:
//  Проверка версии базы данных на сервере
// Returns:
//  Функцию обратного вызова
const update_db = () => {

    return (dispatch) => {
        console.log('update_db');
        dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: true});
        return new Promise((resolve, reject) => {
            if (HARD_CODE_MODE) {
                dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: false});

                resolve(1514451431)
            } else {
                let xhr = new XMLHttpRequest;


                xhr.onload = function () {
                    dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: false});
                    let v = JSON.parse(xhr.responseText);
                    console.log(v);
                    resolve(v.timestamp)
                };
                xhr.onerror = function () {
                    dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: false});
                    reject(xhr)
                };
                xhr.open('GET', DB_VERSION_URL, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Accept", "application/json");
                xhr.send(null)
            }


        })
    }
};
// Function:
//  Загрузка данных для базы данных
// Returns:
//  функцию обратного вызова
const download_db = () => {
    return (dispatch) => {
        console.log('download_db');
        dispatch({type: WEBSQL_DOWNLOAD_DATA_LOADING, payload: true});
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest;
            xhr.onload = function () {
                dispatch({type: WEBSQL_DOWNLOAD_DATA_LOADING, payload: false});
                resolve(JSON.parse(xhr.responseText))
            };
            xhr.onerror = function () {
                dispatch({type: WEBSQL_DOWNLOAD_DATA_LOADING, payload: false});
                reject(xhr)
            };
            xhr.open('GET', DATA_URL);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(null)
        })
    }
};
// Function: init_db
//  Асинхронная функция обратного вызова инициализации базы данных приложения вызываемая через Store.dispatch(
// Parameters:
//  store - экземпляр данных redux хранилища
// Returns:
//  Возвращает функцию обратного вызова
//
const init_db = (store) => {

    return (dispatch) => {
        console.log('INIT DB');

        const currentVersion = store && 'version' in store && 'version' in store.version ? store.version.version : null;
        const db = store && store.db ? store.db : null;

        if (currentVersion) {

            console.log(`ВЕРСИЯ БАЗЫ ДАННЫХ: ${currentVersion}`);
            // TODO шаг 1: Получаю версию базы на бэкэнде
            dispatch(update_db()).then((version) => {
                console.log(version);
                // TODO шаг 2: Запрос прошел
                dispatch({type: WEBSQL_VERSION_DB_SUCCESS, payload: true});
                // TODO шаг 3: Если версия базы на бэкэнде равна версии в приложении
                if (version === currentVersion) {
                    // TODO шаг 4: создаю базу
                    dispatch(create_db(currentVersion))
                        .then((DB) => {
                            // TODO шаг 5: база создана и таблица созданы
                            dispatch({type: WEBSQL_DB_SUCCESS_CREATE, payload: true});
                        })
                        .catch((error) => {
                            console.error(error);
                            // TODO шаг 5: база не создана
                            dispatch({type: WEBSQL_DB_ERROR_CREATE, payload: true});
                        })
                } else {
                    first_init(dispatch);
                }
            }).catch((error) => {
                // TODO шаг 2: Ошибка
                console.error(error);
                // TODO шаг 3: Инициализируем БД
                dispatch(create_db(currentVersion))
                    .then((DB) => {
                        // TODO шаг 4: база создана и таблица созданы
                        dispatch({type: WEBSQL_DB_SUCCESS_CREATE, payload: true});
                    })
                    .catch((error) => {
                        console.error(error);
                        // TODO шаг 4: база не создана
                        dispatch({type: WEBSQL_DB_ERROR_CREATE, payload: true});
                    })
                // dispatch({type: WEBSQL_VERSION_DB_ERROR, payload: true});
            })

        } else {
            first_init(dispatch);
        }


    }
};

// Function:
//  функция первой инициализации базы данных
// Returns:
//  ничего
// Parameters:
//  dispatch - метод redux
const first_init = (dispatch) => {
    console.log('FIRST INIT');
    // TODO: выполняется первый раз при инициализации
    // TODO шаг 1: получаю текущую версию
    dispatch(update_db()).then((version) => {
        console.log(version);

        // TODO шаг 2: отмечаю успешный запрос
        dispatch({type: WEBSQL_VERSION_DB_SUCCESS, payload: true});

        // TODO шаг 3: записываю в redux версию
        dispatch({type: WEBSQL_VERSION_DB_SET, payload: version});

        // TODO шаг 4: создаю базу данных
        dispatch(create_db(version)).then((db) => {
            console.log(db);
            // TODO шаг 5: БД создана
            dispatch({type: WEBSQL_DB_SUCCESS_CREATE, payload: true});

            // TODO шаг 6: получаю данные
            dispatch(download_db()).then((data) => {
                console.log('download_db', data);
                // TODO шаг 7: отмечаю успешный запрос
                dispatch({type: WEBSQL_DOWNLOAD_DATA_SUCCESS, payload: true});

                // TODO шаг 8: Записываю данные в базу
                dispatch(set_db(db, data));

            }).catch((error) => {
                // TODO шаг 7: отмечаю ошибку запрос
                console.error(error);
                dispatch({type: WEBSQL_DOWNLOAD_DATA_ERROR, payload: true});
                return error
            })
        }).catch((error) => {
            console.error(error);
            // TODO шаг 5: база не создана
            dispatch({type: WEBSQL_DB_ERROR_CREATE, payload: true});
        })


    }).catch((error) => {
        console.error(error);
        // TODO шаг 2: отмечаю ошибку запрос
        dispatch({type: WEBSQL_VERSION_DB_ERROR, payload: true});
    })
};

const get_data = (db) => {
    console.log('get_data');
    db.transaction(function (tx) {
        let sqlResultSet = tx.executeSql(`SELECT *
                                          FROM ${TABLE_NAME}
                                          WHERE ID < ?`, [30], (sqlTransaction, sqlResultSet) => {
            console.log(sqlTransaction, sqlResultSet);
        });
        console.log(sqlResultSet);
    });
    // return (dispatch) => {
    //
    //
    // }
};


export {
    update_db,
    create_db,
    download_db,
    init_db,
    get_data
}
