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
import MyLocation from './my_location_icon.png';
import {FORM_ADD_LATLNG, FORM_REMOVE_LATLNG} from "../../store/reducers";
import {GetGeolocationButton} from "../../blocks/get-geolocation";
import {GLOBAL_STYLE} from "../../config";


import {lexicon} from './lexicon';

const MapWithAMarkerClusters = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0",
        loadingElement: (<div></div>),
        containerElement: <div style={{
            height: `calc(100vh - 118px)`,
            paddingTop: '64px',
            //height: `calc(100vh - 118px)`,
            //marginTop: '64px',
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
            icon={props.MyLocation ? MyLocation : ''}

            position={props.markerPos}
        />
        <GetGeolocationButton
            onMapSuccess={props.onMapSuccess}
        />
    </GoogleMap>
);

@connect(
    state => ({ // получаем данные из store
        currentLocal: state.intl,
        complaints_map: state.complaints_map,
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
        const {currentLocal} = this.props;
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
                    backgroundColor: GLOBAL_STYLE.menu.backgroundColor,
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
                                {lexicon[currentLocal].title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <MapWithAMarkerClusters
                    center={{
                        lat: this.state.markerPos.lat ? this.state.markerPos.lat : 46.484583,
                        lng: this.state.markerPos.lng ? this.state.markerPos.lng : 30.7326,
                    }}
                    MyLocation={this.state.markerPos.lng}
                    onClickMap={this.onClickMap}
                    zoom={this.state.markerPos.lat ? 15 : 10}
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
                        {lexicon[currentLocal].cancel}
                    </Button>
                    <Button type="button" raised onClick={this.onSave}
                            style={{backgroundColor: '#b3e5fc', color: '#334148'}} color="primary">
                        {lexicon[currentLocal].ok}
                    </Button>
                </div>
            </Dialog>
        )
    }
}