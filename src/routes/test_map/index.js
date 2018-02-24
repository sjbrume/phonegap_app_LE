import React, {Component} from 'react';

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
        ]
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.createClusters = this.createClusters.bind(this);
        this.initialize = this.initialize.bind(this);

    }

    get initialState() {
        return {
            map: null
        }
    }

    componentDidMount() {
        try {
            setTimeout(() => {
                this.initialize();
            }, 10000);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                this.initialize();
            }, 10000);
        }


    }

    initialize() {

        let map = new google.maps.Map(this.refs["map-container"], {
            zoom: 3,
            center: {lat: -28.024, lng: 140.887}
        });

        this.setState({
            map
        });

        map.addListener('click', function(event) {
            console.log('click',event);
            console.log('click',this);
        });
        this.createClusters(map);
    }

    createClusters(map) {
        let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let markers = this.props.locations.map(function (location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });
        let markerCluster = new MarkerClusterer(map, markers,
            {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                gridSize: 50,
                maxZoom: 15
            });
        console.log(markerCluster);
        // markerCluster.addListener('click', function(event) {
        //     console.log('markerCluster click',event);
        // });

        google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
            let center = cluster.getCenter();
            let size = cluster.getSize();
            let markers = cluster.getMarkers();
            console.log('markerCluster click',cluster);
            console.log('markerCluster click',cluster.getMarkers());
            cluster.getMarkers().map(item => {
                console.log('markerCluster click',item);

            })
        });


    }


    render() {
        return (
            <div id="map-container" ref="map-container" style={{
                width: '100%',
                height: 'calc(100vh - 60px)',
            }}>
                TestMap
            </div>
        )
    }
}