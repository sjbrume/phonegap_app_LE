import React,{Component} from 'react';
import {Marker} from "react-google-maps"
import {connect} from "react-redux";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {lexicon} from './lexicon';
import Error from 'material-ui-icons/Error';
import {TABLE_NAME} from "../../config";
import {MapWithAMarkerClusters} from "./MapWithAMarkerClusters";
import {MAP_CLUSTERING_LOAD,MAP_SET_CENTER} from "../../store/map/action_types";
import {Link,Redirect} from "react-router-dom";
import {Button} from "material-ui";
import {MapFilter} from "./map-flter";
import logo from './logo.png';
import {Store} from '../../store/store';
import {SET_MY_LOCATION} from "../../store/my_location/action_types";
import {INFO_DIALOG_TOGGLE} from "../../store/info_dialog/action_types";

import marker_license_active from './marker_license_active.svg';
import marker_license_canceled from './marker_license_canceled.svg';
import {AddressSelectionDialog} from "./address_selection_dialog";

import {getAddressInfo} from "../../store/map/action";
import {TestMap} from "../test_map/index";

function mapStateToProps(state) {
    return {
        address_info: state.map.address_info,
        clustering: state.map.clustering,
        filter: state.map.filter,
        map_center: state.map.center,
        currentLocal: state.intl,
        info_dialog: state.info_dialog.toggle,
        my_location: state.my_location,
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

function mapDispatchToProps(dispatch) {
    return {
        dispatch: (type,payload) => {
            dispatch({type,payload})
        }
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export class HomePage extends Component {

    static API_KEY = 'AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0';
    static DB;

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createLoadingPanel = this.createLoadingPanel.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
        this.onMapSuccess = this.onMapSuccess.bind(this);
        this.networkInfo = this.networkInfo.bind(this);
        this.createMarkerCluster = this.createMarkerCluster.bind(this);
    }

    get initialState() {
        return {
            bottom: false,
            description: false,
            createInfoDialog: true,
            markers: [],
            markersCanceled: [],
            markerPos: {
                lat: null,
                lng: null,
            }
        }
    }

    componentDidMount() {
        // this.createWebSQL();
    }

    componentWillUnmount() {
        const {db,data,set,version,currentLocal,clustering,filter} = this.props;
        if (!clustering) {
            this.props.dispatch(MAP_CLUSTERING_LOAD,true);
        }
        this.props.dispatch(MAP_SET_CENTER,{
            lat: null,
            lng: null,
        })
    }

    componentWillReceiveProps(nextProps) {
        const {db,set,filter} = nextProps;
        console.log('componentWillReceiveProps',nextProps);

        if (db !== this.props.db.db && set.success) {
            if (this.state.markers.length === 0) {
                let result = this.getMarkers();
            }
        }
        if (filter !== this.props.filter && set.success) {
            console.log(nextProps,this.props);
            let result = this.getMarkers(nextProps.filter);
        }
    };

    /** @desc метод для отображения панели прелоадера с статусами инициализации карты */
    createLoadingPanel() {
        document.getElementsByClassName('layout-main_content')[0].style.marginTop='0';

        const {db,data,set,version,currentLocal,clustering,filter} = this.props;

        if (version.loading) {
            return this.renderLoading(lexicon[ currentLocal ].loading.version,true)
        } else if (!version.loading && version.error) {
            return this.renderLoading(lexicon[ currentLocal ].error.version,false)
        }

        if (db.loading) {
            return this.renderLoading(lexicon[ currentLocal ].loading.db,true)
        } else if (!db.loading && db.error) {
            return this.renderLoading(lexicon[ currentLocal ].error.db,false)
        }

        if (data.loading) {
            return this.renderLoading(lexicon[ currentLocal ].loading.data,true)
        } else if (!data.loading && data.error) {
            return this.renderLoading(lexicon[ currentLocal ].error.data,false)
        }
        if (set.loading) {
            return this.renderLoading(lexicon[ currentLocal ].loading.set,true)
        } else if (!set.loading && set.error) {
            return this.renderLoading(lexicon[ currentLocal ].error.set,false)
        }

        if (clustering) {
            if (!this.state.markers.length) {
                console.log('clustering = true');
                let result = this.getMarkers(filter);
            }
        }

        return null
    }

    /**
     * @param {string} filter - строка с названиями фильтров по sql базе
     * @desc вызов метода создания маркеров */
    async getMarkers(filter = 'alcohol, beer') {
        console.log('getMarkers');
        const {db} = this.props;
        const data = await new Promise((resolve,reject) => {
            try {

                /** @desc разбираю строку на массив параметров фильтра */
                let array = filter.split(', ');
                /** @desc sql фильтр для запроса */
                let newFilter = ''; //
                /** @desc формирую строку для sql запроса */
                array.map((item,index) => {
                    newFilter += `license_type = '${item}' OR `;
                });
                console.log('newFilter: ',newFilter);


                /** @desc подключаюсь к websql */
                ('db' in db) && db.db.transaction((tx) => {
                    /** @desc запрос на получение данных по ранее созданному фильтру из таблицы адресов */
                    let sqlResultSet = tx.executeSql(`SELECT *
                                                      FROM ${TABLE_NAME}
                                                      WHERE ${newFilter} license_type = 'mixed'`,[],
                        (sqlTransaction,sqlResultSet) => {
                            console.log(sqlTransaction,sqlResultSet);
                            /** @desc возвращаю полученные адреса */
                            resolve(sqlResultSet.rows)
                        },(sqlTransaction,sqlEerror) => {
                            console.log('sqlEerror: ',sqlTransaction,sqlEerror);
                            /** @desc возвращаю ошибку */
                            reject(sqlEerror);
                        });
                    // console.log(sqlResultSet);
                });
            } catch (err) {
                console.log(err);
            }
        });

        /** @desc вызов метода создания маркеров */
        this.createMarkerCluster(data);

    }

    /**
     *  @param {array} data - массив адресов из websql
     *  @desc Метод получает массив с адресами из бд и сортирует по полю license_type в два отдельных массива:
     *  markers - это
     *  markersCanceled -
     * */
    createMarkerCluster(data = []) {
        const {dispatch} = this.props;

        /** @desc все маркеры с указаным типом лицензи */
        const markers = [];
        /** @desc маркеры адресов с просроченно, без или не известной лицензии */
        const markersCanceled = [];
        /** @desc длинна массива */
        let length = data.length;

        for (let i = 0 ; i < length ; i++) {
            /** @desc на карту попадут только те адреса для которых заданы координаты */
            if (data.item(i).lng && data.item(i).lat) {
                if (data.item(i).license_type !== 'mixed') {
                    markers.push(data.item(i));
                } else {
                    markersCanceled.push(data.item(i));
                }
            }
        }
        /** @desc запись в state класса */
        this.setState({markers,markersCanceled});
        /** @desc смена статуса операции */
        dispatch(MAP_CLUSTERING_LOAD,false);
    }

    renderLoading = (content,load) => (<div className="loading-panel_wrapper">
        <div>

            {
                /** @desc вызов метода создания маркеров */
                load &&
                <CircularProgress style={{
                    display: 'block',
                    color: '#0277bd',
                    margin: '0 auto'
                }} size={60} thickness={7}/>
            }
            {
                !load &&
                <Error style={{
                    color: '#F44336',
                    display: 'block',
                    width: '60px',
                    height: '60px',
                    margin: '0 auto'
                }}/>
            }
            <div className="loading-panel_content">
                {
                    content
                }
            </div>
        </div>
    </div>);

    networkInfo() {
        const {currentLocal} = this.props;

        try {
            if (navigator && navigator.hasOwnProperty('network') && navigator.network.connection.type === 'none') {
                return (<div className="loading-panel_wrapper">
                    <div style={{
                        maxWidth: '300px',
                        padding: '40px 20px',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
                    }}>
                        <Error style={{
                            color: '#F44336',
                            display: 'block',
                            width: '60px',
                            height: '60px',
                            margin: '0 auto'
                        }}/>
                        <div
                            style={{
                                color: '#222',
                            }}
                            className="loading-panel_content">
                            {lexicon[ currentLocal ].network_info}
                        </div>
                    </div>
                </div>)
            } else {
                return null
            }
        } catch (err) {
            console.error('networkInfo():',err);
        }


    }

    onMapSuccess(Latitude,Longitude) {
        console.log('onMapSuccess - Latitude:',Latitude);
        console.log('onMapSuccess - Longitude:',Longitude);

        this.setState({
            markerPos: {
                lat: Latitude,
                lng: Longitude,
            }
        });
        this.props.dispatch(SET_MY_LOCATION,{
            lat: Latitude,
            lng: Longitude,
        });
    }

    render() {
        const {db,data,set,version,currentLocal,my_location,map_center,address_info} = this.props;
        console.log('Home page index',this);
        if (this.props.info_dialog) {
            return (<Redirect to="/statistic-page"/>)
            // return (<Redirect to="/statistic-page"/>)
            // return this.createInfoDialog()
        }
        if (this.networkInfo()) {
            return this.networkInfo()
        }
        if (this.createLoadingPanel()) {
            return this.createLoadingPanel()
        } else {
            // this.getMarkers();
        }
        if (version.error) {
            return (<div>{lexicon[ currentLocal ].error.version}</div>)
        } else if (db.error) {
            return (<div>{lexicon[ currentLocal ].error.db}</div>)
        } else if (data.error) {
            return (<div>{lexicon[ currentLocal ].error.data}</div>)
        } else if (set.error) {
            return (<div>{lexicon[ currentLocal ].error.set}</div>)
        }

        return (
            <div>
                {
                    address_info && <AddressSelectionDialog/>
                }

                {
                    !this.props.clustering &&
                    <TestMap

                        clusteringStatus={this.props.clustering}

                        dispatch={this.props.dispatch}

                        center={{
                            lat: my_location || map_center ? my_location.lat || map_center.lat : 46.484583,
                            lng: my_location || map_center ? my_location.lng || map_center.lng : 30.7326,
                        }}

                        zoom={my_location.lat || map_center.lat ? 14 : 10}

                        MyLocation={my_location.lat}

                        onMapSuccess={this.onMapSuccess}

                        markers={this.state.markers}

                        markersCanceled={this.state.markersCanceled}

                    />

                }
                <MapFilter/>


                {
                    this.props.clustering &&
                    <div className="loading-panel_wrapper">
                        <div>
                            <CircularProgress style={{
                                display: 'block',
                                color: '#0277bd',
                                margin: '0 auto'
                            }} size={60} thickness={7}/>
                            <div className="loading-panel_content">
                                {lexicon[ currentLocal ].load_map}
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}