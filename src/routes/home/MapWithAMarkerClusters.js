import React from 'react';

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer"
import {compose, withProps, withHandlers} from "recompose";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {MAP_DUPLICATE_POSITION} from "../../store/map/action_types";
import MyLocation from '../complaints_map/my_location_icon.png';
import {GetGeolocationButton} from "../../blocks/get-geolocation";

import {Store} from '../../store/store';
import {getDuplicateAddress} from "../../store/map/action";

function positionCheck(clickedMarkers) {
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

export const MapWithAMarkerClusters = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0",
        loadingElement: (<div className="loading-panel_wrapper">
            <div>
                <CircularProgress style={{
                    display: 'block',
                    color: '#0277bd',
                    margin: '0 auto'
                }} size={60} thickness={7}/></div>
        </div>),
        containerElement: <div style={{height: `calc(100vh - 64px)`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withHandlers({
        onMarkerClusterClick: () => (markerCluster) => {
            const clickedMarkers = markerCluster.getMarkers();
            console.log(`Current clicked markers length: ${clickedMarkers.length}`);
            console.log('markerCluster:', markerCluster);
            console.log('clickedMarkers:', clickedMarkers);

            if (clickedMarkers.length < 20) {


                if (positionCheck(clickedMarkers)) {
                    const arrayID = [];
                    clickedMarkers.map((item, index) => {
                        arrayID.push(item.title);
                        console.log(`item-${index}`, item);
                        console.log(`
                             lat: ${item.position.lat()}
                             lng: ${item.position.lng()}`);
                    })
                    Store.dispatch(getDuplicateAddress(Store.getState(), arrayID));

                }

            }


        },
    }),
    withScriptjs,
    withGoogleMap
)(props => {
        console.log(props);
        return (<GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={{
                lat: 46.484583,
                lng: 30.7326,
            }}
            center={props.center.lat ? props.center : {
                lat: 46.484583,
                lng: 30.7326,
            }}
            options={{
                mapTypeControl: true,
                zoomControl: true,
                zoomControlOptions: {},
                fullscreenControl: false,
                streetViewControl: false,
            }}
            zoom={props.zoom}
            // onClick={(event) => {
            //     console.log(event)
            //     console.log('lng:',event.latLng.lng());
            //     console.log('lat:',event.latLng.lat());
            // }}
        >
            {
                props.markers.length > 0 &&
                <MarkerClusterer
                    onClick={props.onMarkerClusterClick}
                    onClusteringBegin={() => {
                        // if(!props.clusteringStatus){
                        //     props.dispatch(MAP_CLUSTERING_LOAD, true);
                        // }
                    }}
                    onClusteringEnd={() => {
                        // if(props.clusteringStatus){
                        //     props.dispatch(MAP_CLUSTERING_LOAD, false);
                        // }
                    }}

                    clusterClass={'cluster cluster_license--active'}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {props.markers}

                </MarkerClusterer>
            }
            {
                props.markersCanceled.length > 0 &&
                <MarkerClusterer
                    onClick={props.onMarkerClusterClick}
                    onClusteringBegin={() => {
                        // if(!props.clusteringStatus){
                        //     props.dispatch(MAP_CLUSTERING_LOAD, true);
                        // }
                    }}
                    onClusteringEnd={() => {
                        // if(props.clusteringStatus){
                        //     props.dispatch(MAP_CLUSTERING_LOAD, false);
                        // }
                    }}

                    clusterClass={'cluster cluster_license--canceled'}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {props.markersCanceled}

                </MarkerClusterer>
            }

            {
                props.MyLocation && <Marker
                    icon={props.MyLocation ? MyLocation : ''}

                    position={props.center}
                />
            }

            <GetGeolocationButton
                onMapSuccess={props.onMapSuccess}
            />

        </GoogleMap>)
    }
);