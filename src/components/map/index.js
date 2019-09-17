import React from "react";
import "./map.css";
import MapHeader from "./header"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from "react-redux";

const apiKey = "AIzaSyDCtpSTaV-7OjEPzIpgj_4Vc8ErY7NqO5k"
class Map extends React.Component {
    state = {
        selected: {}
    }

    generateMap = () => {
        const markers = this.generateMarkers();
        const PartioMap = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 61.29, lng: 23.45 }}
            >
                {markers}
            </GoogleMap>
        ))

        return PartioMap;


    }
    generateMarkers = () => {
        const { results } = this.props;
        let markers = results.map(reg => {
            return <Marker position={reg.geo} onClick={() => this.setState({ selected: reg })} />
        });
        return markers;
    }

    render() {
        const { results } = this.props;
        const PartioMap = this.generateMap();
        // const PartioMap = withScriptjs(withGoogleMap((props) =>
        //     <GoogleMap
        //         defaultZoom={8}
        //         defaultCenter={{ lat: -34.397, lng: 150.644 }}
        //     >
        //         <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        //     </GoogleMap>
        // ))

        return (
            <div className="map-container">
                <div className="map">
                    <MapHeader resultAmount={results.length} />
                    <PartioMap
                        isMarkerShown
                        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults
    }
}
export default connect(mapStateToProps)(Map);