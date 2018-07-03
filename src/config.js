export const TIMEOUT = 0; // для таймеров в экшене websql
export const DB_NAME = 'Excise'; // имя базы
export const TABLE_NAME = 'places_list'; // имя таблицы

export const HARD_CODE_MODE = false;

export const DATA_URL = HARD_CODE_MODE ? 'assets/map.json' : 'http://1288987.lglwrk.web.hosting-test.net/map'; // адрес получения данных карты
export const DB_VERSION_URL = 'http://1288987.lglwrk.web.hosting-test.net/updated_at'; // адрес получения версии БД
export const DROP_TABLE = false; // удолять таблицу перед создание


const PRIMARY_COLOR = '#0277bd';
const TEST_COLOR = '#fce400';

export const GLOBAL_STYLE = {
    menu:{
        backgroundColor: PRIMARY_COLOR,
        burgerColor: PRIMARY_COLOR,
        fontColor: '#ffffff'
    },
    GetGeolocationButton: {
        backgroundColor: '#fce400'
    }
};