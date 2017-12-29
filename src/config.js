export const TIMEOUT = 0; // для таймеров в экшене websql
export const DB_NAME = 'Excise'; // имя базы
export const TABLE_NAME = 'places_list'; // имя таблицы

export const HARD_CODE_MODE = false;

export const DATA_URL = HARD_CODE_MODE ? 'assets/map.json' : 'http://185.25.117.8/map'; // адрес получения данных карты
export const DB_VERSION_URL = 'http://185.25.117.8/updated_at'; // адрес получения версии БД
export const DROP_TABLE = false; // удолять таблицу перед создание