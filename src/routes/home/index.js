import React, {Component} from 'react';
import {Marker} from "react-google-maps"
import Drawer from 'material-ui/Drawer';
import {connect} from "react-redux";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {lexicon} from './lexicon';
import {WEBSQL_SEARCH_REMOVE, WEBSQL_SEARCH_SET} from "../../store/websql/action_types";
import Error from 'material-ui-icons/Error';
import {TABLE_NAME} from "../../config";
import {MapWithAMarkerClusters} from "./MapWithAMarkerClusters";
import {MAP_CLUSTERING_LOAD} from "../../store/map/action_types";
import {Link} from "react-router-dom";
import {Button} from "material-ui";
import {MapFilter} from "./map-flter";
import logo from './logo.png';
import {FORM_ADD_LATLNG} from "../../store/reducers";

function mapStateToProps(state) {
    return {
        clustering: state.map.clustering,
        filter: state.map.filter,
        my_location: state.my_location,
        currentLocal: state.intl,
        search_result: state.websql.search_result,
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
        dispatch: (type, payload) => {
            dispatch({type, payload})
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class HomePage extends Component {

    static API_KEY = 'AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0';
    static DB;

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createLoadingPanel = this.createLoadingPanel.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
        this.createInfoDialog = this.createInfoDialog.bind(this);
        this.onMapSuccess = this.onMapSuccess.bind(this);
    }

    get initialState() {
        return {
            bottom: false,
            description: false,
            createInfoDialog: true,
            markers: [],
            markerPos: {
                lat: null,
                lng: null,
            }
        }
    }

    componentDidMount() {
        // this.createWebSQL();
    }

    componentWillReceiveProps(nextProps) {
        const {db, set, search_result, filter} = nextProps;
        console.log(nextProps);
        if (search_result !== this.props.search_result) {
            console.log(this.props.search_result);
            this.toggleDescription(true, search_result);
            return true
        }
        if (db !== this.props.db.db && set.success) {
            if (this.state.markers.length === 0) {
                let result = this.getMarkers();
                console.log(result);
            }
        }
        if (filter !== this.props.filter && set.success) {
            console.log(nextProps, this.props);
            let result = this.getMarkers(nextProps.filter);
        }
    };

    createLoadingPanel() {
        const {db, data, set, version, currentLocal} = this.props;

        if (version.loading) {
            return this.renderLoading(lexicon[currentLocal].loading.version, true)
        } else if (!version.loading && version.error) {
            return this.renderLoading(lexicon[currentLocal].error.version, false)
        }

        if (db.loading) {
            return this.renderLoading(lexicon[currentLocal].loading.db, true)
        } else if (!db.loading && db.error) {
            return this.renderLoading(lexicon[currentLocal].error.db, false)
        }

        if (data.loading) {
            return this.renderLoading(lexicon[currentLocal].loading.data, true)
        } else if (!data.loading && data.error) {
            return this.renderLoading(lexicon[currentLocal].error.data, false)
        }
        if (set.loading) {
            return this.renderLoading(lexicon[currentLocal].loading.set, true)
        } else if (!set.loading && set.error) {
            return this.renderLoading(lexicon[currentLocal].error.set, false)
        }
        return null
    }

    async getMarkers(filter = 'alcohol') {
        const {db} = this.props;
        const markers = [];
        const data = await new Promise((resolve, reject) => {
            try {

                ('db' in db) && db.db.transaction((tx) => {
                    let sqlResultSet = tx.executeSql(`SELECT *
                                                      FROM ${TABLE_NAME}
                                                      WHERE license_type = ?`, [filter],
                        (sqlTransaction, sqlResultSet) => {
                            console.log(sqlTransaction, sqlResultSet);
                            resolve(sqlResultSet.rows)
                        }, (sqlTransaction, sqlEerror) => {
                            console.log(sqlTransaction, sqlEerror);
                            reject(sqlEerror);
                        });
                    console.log(sqlResultSet);
                });
            } catch (err) {
                console.log(err);
            }
        });

        console.log(data[0]);
        let length = data && data.length ? data.length : 0;

        for (let i = 0; i < length; i++) {
            if (data[i].lng && data[i].lat) {
                markers.push(<Marker
                    key={i}
                    position={{lat: data[i].lat, lng: data[i].lng}}
                    onClick={() => this.toggleDescription(true, data[i])}
                />)
            }
        }

        this.setState({markers});
        this.props.dispatch(MAP_CLUSTERING_LOAD, false);

    }

    renderLoading = (content, load) => (<div className="loading-panel_wrapper">
        <div>

            {
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

    toggleDescription(open, data) {
        console.log('openDescription', data);
        const {currentLocal} = this.props;
        if (data) {
            const description = (
                <div className="places-description_wrapper" style={{
                    padding: '0 15px'
                }}>
                    <h3 className="places-description_title">
                        {lexicon[currentLocal].company_desc.company}: {data.company}
                    </h3>
                    <p className="places-description_text">
                        {lexicon[currentLocal].company_desc.license_type}: {data.license_type === 'alcohol' ? lexicon[currentLocal].company_desc.alcohol : lexicon[currentLocal].company_desc.tobacco}
                        <br/>
                        {lexicon[currentLocal].company_desc.license_number}: {data.license} <br/>
                        {lexicon[currentLocal].company_desc.license_start_at}/{lexicon[currentLocal].company_desc.license_end_at}: {data.license_start_at}
                        — {data.license_end_at}
                    </p>
                    <Button type="button" raised
                            style={{backgroundColor: '#b3e5fc', color: '#334148', marginBottom: '15px'}}
                            color="primary">
                        <Link className={'fonts-white'} to={'/complaints/' + data.id}>
                            Сообщить о нарушении
                        </Link>
                    </Button>

                </div>
            );
            this.setState({
                'bottom': open,
                description
            });
        } else {
            this.setState({
                'bottom': open,
                description: null
            });
            if (this.props.search_result) {
                this.props.dispatch(WEBSQL_SEARCH_REMOVE, null)
            }
        }

    }

    createInfoDialog() {
        const {currentLocal} = this.props;

        const data = new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate();
        return (
            <div className="loading-panel_wrapper">
                <div className="info-dialog_content">
                    <div className="info-dialog_logo">
                        <img src={logo} alt="" className="info-dialog_img"/>
                    </div>
                    <div className="info-dialog_text">
                        <div className="info-dialog_text-title">
                            {lexicon[currentLocal].info_dialog.title}
                        </div>
                        <div style={{textAlign: 'center', paddingBottom: 20}} className="info-dialog_text-title">
                            {data}
                        </div>
                        <div className="info-dialog_text-row">
                            <span className="info-dialog_text-type">
                                {lexicon[currentLocal].info_dialog.alcohol}:
                            </span>
                            <span className="info-dialog_text-content">
                                4164
                            </span>
                        </div>
                        <div className="info-dialog_text-row">
                            <span className="info-dialog_text-type">
                                {lexicon[currentLocal].info_dialog.tobacco}:
                            </span>
                            <span className="info-dialog_text-content">
                                3181
                            </span>
                        </div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Button onClick={() => {
                            this.setState({createInfoDialog: false})
                        }} type="button" raised
                                style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                            {lexicon[currentLocal].info_dialog.close}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    onMapSuccess(Latitude, Longitude) {
        console.log('onMapSuccess - Latitude:', Latitude);
        console.log('onMapSuccess - Longitude:', Longitude);

        this.setState({
            markerPos: {
                lat: Latitude,
                lng: Longitude,
            }
        });
        this.props.dispatch('MY_LOCATION', {
            lat: Latitude,
            lng: Longitude,
        });
    }

    render() {
        const {db, data, set, version, currentLocal, search_result, my_location} = this.props;
        console.log('Home page index', this);
        if (this.state.createInfoDialog) {
            return this.createInfoDialog()
        }
        if (this.createLoadingPanel()) {
            return this.createLoadingPanel()
        }
        if (version.error) {
            return (<div>{lexicon[currentLocal].error.version}</div>)
        } else if (db.error) {
            return (<div>{lexicon[currentLocal].error.db}</div>)
        } else if (data.error) {
            return (<div>{lexicon[currentLocal].error.data}</div>)
        } else if (set.error) {
            return (<div>{lexicon[currentLocal].error.set}</div>)
        }

        return (
            <div>
                {
                    !this.props.clustering &&
                    <MapWithAMarkerClusters

                        clusteringStatus={this.props.clustering}

                        dispatch={this.props.dispatch}

                        center={{
                            lat: search_result.lat || my_location.lat ? search_result.lat || my_location.lat : 46.484583,
                            lng: search_result.lng || my_location.lng ? search_result.lng || my_location.lng : 30.7326,
                        }}

                        zoom={search_result.lat || my_location.lat ? 14 : 10}

                        MyLocation={my_location.lat}

                        onMapSuccess={this.onMapSuccess}

                        toggleDescription={this.toggleDescription} markers={this.state.markers}
                    />

                }
                <MapFilter/>

                <Drawer
                    onClick={() => this.toggleDescription(false, null)}
                    onKeyDown={() => this.toggleDescription(false, null)}
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={() => this.toggleDescription(false, null)}
                >
                    {this.state.description}

                </Drawer>
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
                                Загрузка карты...
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}