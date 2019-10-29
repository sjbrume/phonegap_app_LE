import React, {Component} from 'react';
import marker_license_active from '../home/marker_license_active.svg';
import marker_license_canceled from '../home/marker_license_canceled.svg';
import {Store} from '../../store/store';
import {getAddressInfo} from "../../store/map/action";
import {GetGeolocationButton} from "../../blocks/get-geolocation";
import MyLocation from '../complaints_map/my_location_icon.png';
import {connect} from "react-redux";


function mapStateToProps(state) {
    return {
        db: state.websql.db.db,
        filter: state.map.filter,
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
export class TestMap extends Component {

    static propTypes = {};

    static defaultProps = {
        locations: [

        ],
        center: {
            lat: 46.484583,
            lng: 30.7326,
        },
        zoom: 10,
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createClusters = this.createClusters.bind(this);
        this.initialize = this.initialize.bind(this);
        this.onClickCluster = this.onClickCluster.bind(this);
        this.createMyLocation = this.createMyLocation.bind(this);
        this.searchPlaces = this.searchPlaces.bind(this);
        this.onClickMarker = this.onClickMarker.bind(this);

    }

    get initialState() {
        return {
            map: null,
            my_location_marker: null,
        }
    }

    componentDidMount() {

        try {
            const initialize = this.initialize;
            let count = 0;
            let initTimer = setTimeout(function initCallback() {
                console.log("тик");
                if (initialize() || count === 4) {

                    return;
                }
                ++count;

                initTimer = setTimeout(initCallback, 2000);
            }, 2000);

            // setTimeout(() => {
            //     this.initialize();
            // }, 10000);
        } catch (error) {
            console.log(error);

        }


    }

    initialize() {
        // lat: 46.39593493567351;
        // lng: 30.69601575056072;
        if (!google) return false;
        let map = new google.maps.Map(this.refs["map-container"], {
            // disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            zoom: this.props.zoom,
            // zoom: 16,
            center: this.props.center.lat ? this.props.center : {
                lat: 46.484583,
                lng: 30.7326,
                // lat: 46.39593493567351,
                // lng:  30.69601575056072,
            }
        });
        console.log(map);
        this.setState({
            map
        });
        map.addListener('zoom_changed', function() {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            console.log(`lat: ${map.center.lat()};
                            lng: ${map.center.lng()};`);
            console.log(map.getZoom());
        });
        this.createClusters(map, this.props.markers, 'cluster_license--active', marker_license_active);
        this.createClusters(map, this.props.markersCanceled, 'cluster_license--canceled', marker_license_canceled);
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate:', nextProps, nextState);

        if(nextProps.center.lng !== this.props.center.lng) {
            if(nextProps.MyLocation) {
                this.createMyLocation(nextProps.center);
            }
            this.state.map.setCenter(nextProps.center);
            this.state.map.setZoom(nextProps.zoom);
        }

        return false;
    }

    positionCheck(clickedMarkers) {
        const length = clickedMarkers.length;
        const searchParam = {
            lng: clickedMarkers[0].position.lng(),
            lat: clickedMarkers[0].position.lat(),
        };
        for (let i = 1; i < length; i++) {
            if (searchParam.lng !== clickedMarkers[i].position.lng() && searchParam.lat !== clickedMarkers[i].position.lat()) {
                return false
            }
        }
        return searchParam
    }

    onClickCluster(cluster) {
        let markers = cluster.getMarkers();
        console.log('onClickCluster cluster', cluster);
        console.log('onClickCluster markers', markers);

        if (markers && markers.length < 20) {
            console.log('onMarkerClusterClick: ', markers);


            if (this.positionCheck(markers)) {
                console.log('onMarkerClusterClick positionCheck: ', markers);
                const arrayID = [];
                markers.map((item, index) => {
                    arrayID.push(item.data.id);
                    console.log(`item-${index}`, item);
                    console.log(`
                             lat: ${item.position.lat()}
                             lng: ${item.position.lng()}`);
                });
                console.log('onMarkerClusterClick arrayID: ', arrayID);
                Store.dispatch(getAddressInfo(Store.getState(), arrayID));
            }

        }

        markers && markers.map(item => {
            console.log('markerCluster click', item);
        })
    }

    /*
    * @param {object} pos
    * @description Createmarker you location*/
    createMyLocation(pos) {
        if(this.state.my_location_marker) {
            this.state.my_location_marker.setMap(null);
        }
        let my_location_marker = new google.maps.Marker({
            position: pos,
            map: this.state.map,
            icon: MyLocation,
        });
        console.log('my_location_marker:',my_location_marker);

        this.setState({my_location_marker});
    }

    onClickMarker(map, location) {
        const {} = this.props;
        return (event) => {
            console.log('click', location);
            const {db,filter} = this.props;
            console.log(this.props);
            let array       = filter.split(', '); // разбираю строку на массив параметров фильтра
            let newFilter   = ''; // фильтр для запроса
            array.map((item, index) => {
                newFilter += `license_type = '${item}' OR `;
            });

            if(map.getZoom() > 15) {
                const WHERE = `(lng = ${location.lng} AND lat = ${location.lat}) AND (${newFilter} license_type = 'mixed')`;
                const query = `SELECT * FROM 'places_list' WHERE ${WHERE}`;


                db.transaction((tx) => {
                    tx.executeSql(query,
                        [],
                        (sqlTransaction, sqlResultSet) => {
                            console.log(sqlResultSet.rows);
                            let arrayId = [];
                            for(let i = 0; i < sqlResultSet.rows.length; i++) {
                                arrayId.push(sqlResultSet.rows.item(i).id)
                            }
                            Store.dispatch(getAddressInfo(Store.getState(), arrayId))
                        }, (sqlTransaction, sqlEerror) => {
                            console.log(sqlTransaction, sqlEerror);
                        })
                })
            } else {

                Store.dispatch(getAddressInfo(Store.getState(), [location.id]))
            }


        }
    }

    searchPlaces(){

    }

    createClusters(map, data, className, icon) {
        console.log('createClusters');
        let onClickMarker = this.onClickMarker;
        let markers = data.map(function (location, i) {

            let marker = new google.maps.Marker({
                position: location,
                icon: icon,
                data: location,
            });

            marker.addListener('click', onClickMarker(map, location));

            return marker;
        });
        let markerCluster = new MarkerClusterer(map, markers,
            {
                gridSize: 60,
                maxZoom: 15,
                className: className
            });
        console.log(markerCluster);
        google.maps.event.addListener(markerCluster, 'clusterclick', this.onClickCluster);


    }


    render() {
        console.log('TEST MAP:', this.props);
        return (
            <div style={{
                width: '100%',
                height: 'calc(100vh - 64px)',
            }}>
                <div id="map-container" ref="map-container" style={{
                    width: '100%',
                    height: 'calc(100vh - 64px)',
                }}>

                </div>
                {
                    this.props.onMapSuccess && <GetGeolocationButton
                        onMapSuccess={this.props.onMapSuccess}
                    />
                }

            </div>

        )
    }
}
