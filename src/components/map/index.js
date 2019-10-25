import React from "react";
import "./map.css";
import MapHeader from "./header"
import SideSlider from "./header/sideSlider"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from "react-redux";
import { setCoordinates, selectLocation } from "../../actions/MapActions"


const apiKey = "AIzaSyDCtpSTaV-7OjEPzIpgj_4Vc8ErY7NqO5k"
class Map extends React.Component {
    state = {
        selected: null
    }

    generateMap = () => {
        const { selectedLoc } = this.props;
        const { selected } = this.state;
        let center = { lat: 61.29, lng: 23.45 };
        let zoom = 8;
        if (selected !== null) {
            center = selected.geo;
        } else if (selectedLoc !== null) {
            center = selectedLoc.geo;
        }
        const markers = this.generateMarkers();
        const PartioMap = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={center}
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
        const { results, coords, filterTypes, selectedLoc } = this.props;
        const { selected } = this.state;
        console.time("kartta");
        const PartioMap = this.generateMap();
        console.timeEnd("kartta");
        return (

            <div className="map-container">
                <div className="map">
                    <MapHeader types={filterTypes} results={results} renderMenu resultAmount={results.length} data={results} />
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
        coords: state.map.coords,
        selectedLoc: state.map.selectedLocation,
        filterTypes: state.filters.locationTypeFilterList
    }
}
export default connect(mapStateToProps, { setCoordinates })(Map);