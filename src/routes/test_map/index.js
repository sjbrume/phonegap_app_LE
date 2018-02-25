import React, {Component} from 'react';
import marker_license_active from '../home/marker_license_active.svg';
import marker_license_canceled from '../home/marker_license_canceled.svg';
import {Store} from '../../store/store';
import {getAddressInfo} from "../../store/map/action";
import {GetGeolocationButton} from "../../blocks/get-geolocation";
import MyLocation from '../complaints_map/my_location_icon.png';

export class TestMap extends Component {

    static propTypes = {};

    static defaultProps = {
        locations: [
            {lat: -31.563910, lng: 147.154312},
            {lat: -33.718234, lng: 150.363181},
            {lat: -33.727111, lng: 150.371124},
            {lat: -33.848588, lng: 151.209834},
            {lat: -33.851702, lng: 151.216968},
            {lat: -34.671264, lng: 150.863657},
            {lat: -35.304724, lng: 148.662905},
            {lat: -36.817685, lng: 175.699196},
            {lat: -36.828611, lng: 175.790222},
            {lat: -37.750000, lng: 145.116667},
            {lat: -37.759859, lng: 145.128708},
            {lat: -37.765015, lng: 145.133858},
            {lat: -37.770104, lng: 145.143299},
            {lat: -37.773700, lng: 145.145187},
            {lat: -37.774785, lng: 145.137978},
            {lat: -37.819616, lng: 144.968119},
            {lat: -38.330766, lng: 144.695692},
            {lat: -39.927193, lng: 175.053218},
            {lat: -41.330162, lng: 174.865694},
            {lat: -42.734358, lng: 147.439506},
            {lat: -42.734358, lng: 147.501315},
            {lat: -42.735258, lng: 147.438000},
            {lat: -43.999792, lng: 170.463352}
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
        if (!google) return false;
        let map = new google.maps.Map(this.refs["map-container"], {
            zoom: this.props.zoom,
            center: this.props.center.lat ? this.props.center : {
                lat: 46.484583,
                lng: 30.7326,
            }
        });
        console.log(map);
        this.setState({
            map
        });
        this.createClusters(map, this.props.markers, 'cluster_license--active', marker_license_active);
        this.createClusters(map, this.props.markersCanceled, 'cluster_license--canceled', marker_license_canceled);
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate:', nextProps, nextState);

        if(nextProps.center.lng !== this.props.center.lng) {
            this.createMyLocation(nextProps.center);
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

        if (markers.length < 20) {
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

        markers.map(item => {
            console.log('markerCluster click', item);
        })
    }

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
        my_location_marker.addListener('click', (event) => {
            console.log('click', location);
            Store.dispatch(getAddressInfo(Store.getState(), [location.id]))
        });
        this.setState({my_location_marker});
    }
    createClusters(map, data, className, icon) {
        console.log('createClusters');

        let markers = data.map(function (location, i) {

            let marker = new google.maps.Marker({
                position: location,
                icon: icon,
                data: location,
            });

            marker.addListener('click', (event) => {
                console.log('click', location);
                Store.dispatch(getAddressInfo(Store.getState(), [location.id]))
            });

            return marker;
        });
        let markerCluster = new MarkerClusterer(map, markers,
            {
                gridSize: 50,
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