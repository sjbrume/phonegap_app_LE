import React from 'react';

import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer"
import {compose, withProps, withHandlers} from "recompose";
import CircularProgress from 'material-ui/Progress/CircularProgress';
import {MAP_CLUSTERING_LOAD} from "../../store/map/action_types";
import {SuperButton} from "../complaints_map/complaints_map";
import MyLocation from '../complaints_map/my_location_icon.png';

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
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={{
            lat: 46.484583,
            lng: 30.7326,
        }}
        center={props.center}
        zoom={props.zoom}
        // onClick={(event) => {
        //     console.log(event)
        //     console.log('lng:',event.latLng.lng());
        //     console.log('lat:',event.latLng.lat());
        // }}
    >
        {
            props.markers.length > 0 && <MarkerClusterer
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

                averageCenter
                enableRetinaIcons
                gridSize={60}
            >
                {props.markers}

            </MarkerClusterer>
        }

        {
            props.MyLocation && <Marker
                icon={props.MyLocation ? MyLocation : ''}

                position={props.center}
            />
        }

        <SuperButton
            onMapSuccess={props.onMapSuccess}
        />

    </GoogleMap>
);