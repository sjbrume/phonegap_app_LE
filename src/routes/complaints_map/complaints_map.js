import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import Button from 'material-ui/Button';
import {compose, withProps, withHandlers} from "recompose";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {getFormValues} from "redux-form";
import {connect} from "react-redux";
import {Dialog} from "material-ui";
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Loop from 'material-ui-icons/Loop';
import {FORM_ADD_LATLNG, FORM_REMOVE_LATLNG} from "../../store/reducers";

import LocationSearching from 'material-ui-icons/LocationSearching';

class SuperButton extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onClick = this.onClick.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
        this.isLocationAuthorized = this.isLocationAuthorized.bind(this);
        this.geolocation = this.geolocation.bind(this);
        this.AdvancedGeolocation = this.AdvancedGeolocation.bind(this);
    }

    get initialState() {
        return {
            loading: false
        }
    }

    searchLocation() {
        console.log('searchLocation');
        // let count = 60;
        // // let counter = setInterval(timer, 1000);
        // function timer() {
        //     if (count <= 0) {
        //         clearInterval(counter);
        //         console.info('done');
        //     }
        //     console.log(count, ' sec');
        //     count -= 1;
        // }
        try {
            let locationAccuracy = new Promise((resolve, reject) => {
                cordova.plugins.locationAccuracy.canRequest(
                    (canRequest) => {
                        if (canRequest) {
                            cordova.plugins.locationAccuracy.request(
                                () => {
                                    console.log("Request successful  locationAccuracy");
                                    resolve(canRequest);
                                },
                                (error) => {
                                    console.log("Request failed locationAccuracy:", error);
                                    reject(error);
                                    if (error) {
                                        // Android only
                                        console.error("error code=" + error.code + "; error message=" + error.message);
                                        if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                                            if (window.confirm("Не удалось автоматически установить режим местоположения на «Высокая точность». Вы хотите перейти на страницу настроек местоположения и сделать это вручную?")) {
                                                cordova.plugins.diagnostic.switchToLocationSettings();
                                            }
                                        }
                                    }
                                },
                                cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
                            );
                        }
                    });
            }).then((res) => {
                this.isLocationAuthorized();
                console.log('response:', res)
            }).catch((error) => {
                this.setState({loading: false});

                console.log('error:', error)
            })


        } catch (err) {
            this.setState({loading: false});

            console.log(err);
        }

    }

    isLocationAuthorized() {
        cordova.plugins.diagnostic.isLocationAuthorized((enabled) => {
            console.log("Location is " + (enabled ? "enabled" : "disabled"));

            if (!enabled) {
                cordova.plugins.diagnostic.requestLocationAuthorization((status) => {
                    console.log("Authorization status is now: " + status);
                }, (error) => {
                    this.setState({loading: false});

                    console.error(error);
                });
            } else {
                this.geolocation()
            }
        }, (error) => {
            this.setState({loading: false});

            console.error("The following error occurred: " + error);
        });

    }

    geolocation() {
        let timeout = 20 * 1000;

        let gps = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                    console.log('Latitude: ' + position.coords.latitude + '\n' +
                        'Longitude: ' + position.coords.longitude + '\n' +
                        'Altitude: ' + position.coords.altitude + '\n' +
                        'Accuracy: ' + position.coords.accuracy + '\n' +
                        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                        'Heading: ' + position.coords.heading + '\n' +
                        'Speed: ' + position.coords.speed + '\n' +
                        'Timestamp: ' + position.timestamp + '\n');
                    resolve(position);
                },
                (error) => {
                    console.log('code: ' + error.code + '\n' +
                        'message: ' + error.message + '\n');
                    reject(error);
                }, {
                    timeout: timeout,
                    enableHighAccuracy: true
                });
        }).then(values => {
            console.log(values);
            this.setState({loading: false});
            this.props.onMapSuccess(values.coords.latitude, values.coords.longitude);
        }).catch((error) => {

            this.AdvancedGeolocation();
            console.log('error:', error)
        });

    }

    AdvancedGeolocation() {
        const onMapSuccess = this.props.onMapSuccess;
        let result = new Promise((resolve, reject) => {
            AdvancedGeolocation.start( (success) => {
                    try {
                        let jsonObject = JSON.parse(success);
                        console.log(jsonObject);
                        switch (jsonObject.provider) {
                            case "gps":
                                //TODO
                                break;

                            case "network":
                                if ('latitude' in jsonObject) {
                                    resolve(jsonObject);
                                }
                                break;

                            case "satellite":
                                //TODO
                                break;

                            case "cell_info":
                                //TODO
                                break;

                            case "cell_location":
                                //TODO
                                break;

                            case "signal_strength":
                                //TODO
                                break;
                        }
                    }
                    catch (exc) {
                        console.log("Invalid JSON: " + exc);
                    }
                },
                function (error) {
                    console.log("ERROR! " + JSON.stringify(error));
                },
                {
                    "minTime": 0,         // Min time interval between updates (ms)
                    "minDistance": 0,       // Min distance between updates (meters)
                    "noWarn": true,         // Native location provider warnings
                    "providers": "all",     // Return GPS, NETWORK and CELL locations
                    "useCache": true,       // Return GPS and NETWORK cached locations
                    "satelliteData": false, // Return of GPS satellite info
                    "buffer": false,        // Buffer location data
                    "bufferSize": 0,        // Max elements in buffer
                    "signalStrength": false // Return cell signal strength data
                });
        }).then((resolve)=>{
            this.setState({loading: false});
            this.props.onMapSuccess(resolve.latitude, resolve.longitude);
            AdvancedGeolocation.stop();
        }).catch((error)=>{
            console.log(error);
            this.setState({loading: false});
            AdvancedGeolocation.stop();
        })
    }


    onClick() {
        if (!this.state.loading) {
            this.setState({loading: true});
            this.searchLocation();
        }
    }

    render() {
        const {loading} = this.state;
        return (
            <button onClick={this.onClick} type="button" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 500,
                border: 'none',
                margin: '10px 10px 30px 10px',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: '2px',
                padding: '8px',
                lineHeight: 0,
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px'
            }}>
                {
                    !loading &&
                    <LocationSearching/>
                }
                {
                    loading &&
                    <Loop  className="loading"/>
                }
            </button>
        )
    }

}

const MapWithAMarkerClusters = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0",
        loadingElement: (<div></div>),
        containerElement: <div style={{
            height: `calc(100vh - 118px)`,
            marginTop: '64px',
            position: 'relative'
        }}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withHandlers({}),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={props.center}
        center={props.center}
        zoom={props.zoom}
        onClick={props.onClickMap}
    >
        <Marker
            position={props.markerPos}
        />
        <SuperButton
            onMapSuccess={props.onMapSuccess}
        />
    </GoogleMap>
);

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        values: getFormValues('FormComplaints')(state),
        state: state.form.FormComplaints,
    }),
    dispatch => ({
        dispatch: (type, payload) => {
            dispatch({type, payload})
        }
    })
)
export class ComplaintsMap extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onClickMap = this.onClickMap.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onMapSuccess = this.onMapSuccess.bind(this);
    }

    get initialState() {
        return {
            markerPos: {
                lat: null,
                lng: null,
            }
        }
    }

    onClickMap(event) {
        this.setState({
            markerPos: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            }
        });

        this.props.dispatch(FORM_ADD_LATLNG, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
        return event
    }

    onSave() {

        this.props.toggleHandle(false)
    }

    onCancel() {
        delete this.props.values.lat;
        delete this.props.values.lng;
        this.props.dispatch(FORM_REMOVE_LATLNG, this.props.values);
        this.setState({
            markerPos: {
                lat: null,
                lng: null,
            }
        });
        this.props.toggleHandle(false)
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
        this.props.dispatch(FORM_ADD_LATLNG, {
            lat: Latitude,
            lng: Longitude,
        });
    }

    render() {
        console.log(this.props);
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={() => {
                    this.props.toggleHandle(false)
                }}
                style={{
                    width: '100%',
                    margin: '0'
                }}
            >
                <div style={{
                    width: '100%',
                    margin: '0'
                }} className={'layout-children_header-wrapper'}>
                    <AppBar position="static" className={'layout-children_app-bar'}>
                        <Toolbar className={'layout-children_tool-bar'}>
                            <IconButton
                                onClick={() => {
                                    this.props.toggleHandle(false)
                                }}
                                className={'layout-children_arrow-button'}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={'layout-children_flex'}>
                                Укажите координаты
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <MapWithAMarkerClusters
                    center={{
                        lat: this.state.markerPos.lat ? this.state.markerPos.lat : 46.484583,
                        lng: this.state.markerPos.lng ? this.state.markerPos.lng : 30.7326,
                    }}
                    onClickMap={this.onClickMap}
                    zoom={ this.state.markerPos.lat ? 15 : 10}
                    markerPos={{
                        lat: this.state.markerPos.lat ? this.state.markerPos.lat : 46.484583,
                        lng: this.state.markerPos.lng ? this.state.markerPos.lng : 30.7326,
                    }}
                    onMapSuccess={this.onMapSuccess}
                />
                <div style={{padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                     className="complaints_section">
                    <Button type="button" raised onClick={this.onCancel}
                            style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                        Отмена
                    </Button>
                    <Button type="button" raised onClick={this.onSave}
                            style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                        Ок
                    </Button>
                </div>
            </Dialog>
        )
    }
}