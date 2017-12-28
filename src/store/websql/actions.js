import {
    WEBSQL_DB_CREATE, WEBSQL_DOWNLOAD_DATA_ERROR, WEBSQL_DOWNLOAD_DATA_LOADING, WEBSQL_DOWNLOAD_DATA_SUCCESS,
    WEBSQL_DB_ERROR_CREATE,
    WEBSQL_DB_LOADING, WEBSQL_SET_DATA_ERROR, WEBSQL_SET_DATA_LOADING, WEBSQL_SET_DATA_SUCCESS,
    WEBSQL_DB_SUCCESS_CREATE,
    WEBSQL_VERSION_DB_ERROR,
    WEBSQL_VERSION_DB_LOADING, WEBSQL_VERSION_DB_SET,
    WEBSQL_VERSION_DB_SUCCESS
} from "./action_types";

const create_db = (version) => {
    console.log(version);

    return (dispatch) => {
        console.log('update_db');
        dispatch({type: WEBSQL_DB_LOADING, payload: true});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const DB = window.openDatabase('excise', version, '', 40 * 1024 * 1024);
                    create_table_db(DB);
                    dispatch({type: WEBSQL_DB_CREATE, payload: DB});
                    dispatch({type: WEBSQL_DB_LOADING, payload: false});
                    resolve(DB);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            }, 10000);
        })
    }
};

const create_table_db = (DB) => {
    DB.transaction(function (tx) {

        tx.executeSql(`DROP TABLE IF EXISTS excisetest`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS excisetest (
          id                INTEGER,
          region_id         INTEGER,
          id_code           TEXT,
          address           TEXT,
          lng               REAL,
          lat               REAL,
          license           TEXT,
          company           TEXT,
          license_start_at  NUMERIC,
          license_end_at    NUMERIC,
          license_type      TEXT,
          status            TEXT,
          geocoding_payload TEXT,
          geocoding_at      TEXT,
          created_at        NUMERIC,
          update_at         NUMERIC
        )`);

    });
};

const set_db = (DB, data) => {
    return (dispatch) => {
        dispatch({type: WEBSQL_SET_DATA_LOADING, payload: true});
        setTimeout(() => {
            try {
                // DB.transaction(function (tx) {
                //     data.map(item => {
                //         let {
                //             id,
                //             region_id,
                //             id_code,
                //             address,
                //             lng,
                //             lat,
                //             license,
                //             company,
                //             license_start_at,
                //             license_end_at,
                //             license_type,
                //             status,
                //             geocoding_payload,
                //             geocoding_at,
                //             created_at,
                //             update_at,
                //         } = item;
                //         tx.executeSql(`
                //               INSERT INTO excise2
                //               ( id,
                //                 region_id,
                //                 id_code,
                //                 address,
                //                 lng,
                //                 lat,
                //                 license,
                //                 company,
                //                 license_start_at,
                //                 license_end_at,
                //                 license_type,
                //                 status,
                //                 geocoding_payload,
                //                 geocoding_at,
                //                 created_at,
                //                 update_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                //             `,
                //             [
                //                 id,
                //                 region_id,
                //                 id_code,
                //                 address,
                //                 lng,
                //                 lat,
                //                 license,
                //                 company,
                //                 license_start_at,
                //                 license_end_at,
                //                 license_type,
                //                 status,
                //                 geocoding_payload,
                //                 geocoding_at,
                //                 created_at,
                //                 update_at,
                //             ]);
                //     });
                // });
                dispatch({type: WEBSQL_SET_DATA_LOADING, payload: false});
                dispatch({type: WEBSQL_SET_DATA_SUCCESS, payload: true});
            } catch (err) {
                console.error(err);
                dispatch({type: WEBSQL_SET_DATA_ERROR, payload: true});
            }
        }, 10000);
    }
};

const update_db = () => {

    return (dispatch) => {
        console.log('update_db');
        dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: true});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // переведёт промис в состояние fulfilled с результатом "result"
                dispatch({type: WEBSQL_VERSION_DB_LOADING, payload: false});
                resolve("0.0.1");
            }, 5000);
        })
    }
};

const download_db = () => {
    return (dispatch) => {
        console.log('update_db');
        dispatch({type: WEBSQL_DOWNLOAD_DATA_LOADING, payload: true});
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({type: WEBSQL_DOWNLOAD_DATA_LOADING, payload: false});
                resolve("result");
            }, 5000);
        })
    }
};

const init_db = (store) => {
    return (dispatch) => {
        console.log('INIT DB');
        console.log('INIT DB - store', store);
        const {version: {version: currentVersion}, db} = store;
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
                console.error(error);
                dispatch({type: WEBSQL_VERSION_DB_ERROR, payload: true});
            })

        } else {
            first_init(dispatch);
        }


    }
};

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
                console.log(data);
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

export {
    update_db,
    create_db,
    download_db,
    init_db
}
