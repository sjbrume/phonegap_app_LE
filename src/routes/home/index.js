import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {connect} from "react-redux";
import CircularProgress from 'material-ui/Progress/CircularProgress';

// https://habrahabr.ru/post/213515/
// https://habrahabr.ru/post/84654/
// https://tomchentw.github.io/react-google-maps/
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{lat: 46.484583, lng: 30.7326}}
    >
        {props.isMarkerShown && <Marker position={{lat: 46.484583, lng: 30.7326}}/>}
    </GoogleMap>
));


function mapStateToProps(state) {
    return {
        db: {
            db: state.websql.db.db,
            loading: state.websql.db.loading,
            error: state.websql.db.error,
            success: state.websql.db.success,
        },
        data: {
            loading: state.websql.data.loading,
            error: state.websql.data.error,
            success: state.websql.data.success,
        },
        set: {
            loading: state.websql.set.loading,
            error: state.websql.set.error,
            success: state.websql.set.success,
        },
        version: {
            version: state.websql.version.version,
            loading: state.websql.version.loading,
            error: state.websql.version.error,
            success: state.websql.version.success,
        }
    }
}


@connect(mapStateToProps)
export class HomePage extends Component {

    static API_KEY = 'AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0';
    static DB;

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createWebSQL = this.createWebSQL.bind(this);
        this.createWebSQLTable = this.createWebSQLTable.bind(this);
        this.addToWebSQL = this.addToWebSQL.bind(this);
        this.getArticles = this.getArticles.bind(this);
        this.createLoadingPanel = this.createLoadingPanel.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
    }

    get initialState() {
        return {
            db: null,
            db_config: {
                name: 'excise',
                version: '0.0.1',
                description: 'База данных адресов',
                size: 20 * 1024 * 1024
            }
        }
    }

    componentDidMount() {
        // this.createWebSQL();
    }

    async getArticles() {
        const URL = `assets/russia.json`;

        const {data} = await new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest;
            xhr.onload = function () {
                resolve(JSON.parse(xhr.responseText))
            };
            xhr.onerror = function () {
                reject(new TypeError('Local request failed'))
            };
            xhr.open('GET', URL);
            xhr.send(null)
        });

        this.addToWebSQL(data)
    }

    createWebSQL() {
        const {name, version, description, size} = this.state.db_config;
        this.DB = window.openDatabase(name, version, description, size);
        return this.createWebSQLTable();
    }

    addToWebSQL(obj) {
        console.log(obj.length);
        console.time('test');

        this.DB.transaction(function (tx) {

            obj.map(item => {
                let {aoguid, disid, name, okato, parentguid, regioncode} = item;
                tx.executeSql("INSERT INTO excise2 (aoguid,disid,name,okato,parentguid,regioncode) VALUES (?,?,?,?,?,?)",
                    [aoguid, disid, name, okato, parentguid, regioncode]);
            });
        });
        console.timeEnd('test');

    }

    createWebSQLTable() {
        this.DB.transaction(function (tx) {
            // tx.executeSql(`DROP TABLE IF EXISTS excise`);
            // tx.executeSql(`DROP TABLE IF EXISTS excise2`);

            tx.executeSql(`CREATE TABLE IF NOT EXISTS excise2 (
              ID         INTEGER PRIMARY KEY ASC,
              aoguid     TEXT,
              disid      TEXT,
              name       TEXT,
              okato      TEXT,
              parentguid TEXT,
              regioncode TEXT
            )`);

        });
    }

    createLoadingPanel() {
        const {db, data, set, version} = this.props;

        if (version.loading) {
            return this.renderLoading('Проверка версии базы данных ...')
        } else if (!version.loading && version.error) {
            return this.renderLoading('Ошибка при проверке версии базы данных')
        }

        if (db.loading) {
            return this.renderLoading('Создание базы данных...')
        } else if (!db.loading && db.error) {
            return this.renderLoading('Ошибка при cоздании базы данных...')
        }

        if (data.loading) {
            return this.renderLoading('Получение данных...')
        } else if (!data.loading && data.error) {
            return this.renderLoading('Ошибка при получении данных')
        }
        if (set.loading) {
            return this.renderLoading('Запись данных')
        } else if (!set.loading && set.error) {
            return this.renderLoading('Ошибка при записи данных')
        }
        return null
    }

    renderLoading = (content) => (<div className="loading-panel_wrapper">
        <div>
            <CircularProgress style={{
                display: 'block',
                color: '#0277bd',
                margin: '0 auto'
            }} size={60} thickness={7}/>
            <div className="loading-panel_content">
                {
                    content
                }
            </div>
        </div>
    </div>);

    render() {
        console.log(this.props);
        const {db, data, set, version} = this.props;

        if (this.createLoadingPanel()) {
            return this.createLoadingPanel()
        }
        if (version.error) {
            return (<div>Ошибка при проверке версии базы данных</div>)
        } else if (db.error) {
            return (<div>Ошибка при cоздании базы данных</div>)
        } else if (data.error) {
            return (<div>Ошибка при получении данных</div>)
        } else if (set.error) {
            return (<div>Ошибка при записи данных</div>)
        }
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0"
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `calc(100vh - 64px)`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        )
    }
}