import React from "react";
import "./map.css";
import MapHeader from "./header"
import SideSlider from "./header/sideSlider"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from "react-redux";
import { setCoordinates } from "../../actions/MapActions"


const apiKey = "AIzaSyDCtpSTaV-7OjEPzIpgj_4Vc8ErY7NqO5k"
class Map extends React.Component {
    state = {
        selected: null
    }

    generateMap = () => {
        const markers = this.generateMarkers();
        const PartioMap = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 61.29, lng: 23.45 }}
                onClick={this.handleMapClick}
            >
                {markers}
            </GoogleMap>
        ))

        return PartioMap;


    }
    renderInfo = (obj) => {

    }
    generateMarkers = () => {
        const { results } = this.props;
        let markers = results.map((reg, i) => {
            return <Marker key={reg.text + i} position={reg.geo} onClick={() => this.setState({ selected: reg })} />
        });
        return markers;
    }
    handleMarkerClose = () => {
        this.setState({ selected: null })
    }
    handleMapClick = (e) => {
        const { setCoordinates } = this.props;
        let obj = { lat: e.latLng.lat(), lng: e.latLng.lng() }
        console.log("setCoordinates");
        setCoordinates(obj);

    }
    render() {
        const { results, coords } = this.props;
        const { selected } = this.state;
        const PartioMap = this.generateMap();
        // const PartioMap = withScriptjs(withGoogleMap((props) =>
        //     <GoogleMap
        //         defaultZoom={8}
        //         defaultCenter={{ lat: -34.397, lng: 150.644 }}
        //     >
        //         <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        //     </GoogleMap>
        // ))
        console.log(coords)
        return (

            <div className="map-container">
                <div className="map">
                    <MapHeader results={results} renderMenu resultAmount={results.length} data={results} />
                    <PartioMap
                        isMarkerShown
                        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places"}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    {selected !== null && <SideSlider class={" map-slider"} handleClose={this.handleMarkerClose} data={selected} />}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        coords: state.map.coords
    }
}
export default connect(mapStateToProps, { setCoordinates })(Map);