import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// https://habrahabr.ru/post/213515/
// https://habrahabr.ru/post/84654/
// https://tomchentw.github.io/react-google-maps/
const MyMapComponent = withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 46.484583, lng: 30.7326 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 46.484583, lng: 30.7326 }} />}
    </GoogleMap>
);


export class HomePage extends Component {

    static API_KEY = 'AIzaSyApwO-qq_ruPB3MZ8yk1RsAFeucrb0mUX0';

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            db: null
        }
    }

    componentDidMount() {
    }



    render() {
        console.log(this);
        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `calc(100vh - 64px)` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />            </div>
        )
    }
}