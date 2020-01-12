import React from "react";
import "./map.css";
import MapHeader from "./header"
import SideSlider from "./header/sideSlider"
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import L from "leaflet"
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';

import { connect } from "react-redux";
import { setCoordinates } from "../../actions/MapActions"



class Map extends React.Component {
    state = {
        selected: null,
        userMarker: null,
    }


    renderInfo = (obj) => {

    }
    createClusterCustomIcon = (cluster) => {
        return L.divIcon({
            html: `<div>
            <span class="marker-cluster-label">${cluster.getChildCount()}</span>
                </div>`,
            className: 'marker-cluster-custom',
            iconSize: L.point(40, 40, true),
        });

    };
    scoutIcon = L.icon({
        iconUrl: _ICON_PATH_ + "map-marker.svg",
        iconSize: [40, 50], // size of the icon
    });
    generateMarkers = () => {
        const { results } = this.props;
        const { userMarker } = this.state;
        let markers = results.map((reg, i) => {
            return <Marker
                key={reg.location_region + i}
                position={reg.location_geo}
                onClick={() => this.setState({ selected: reg })}
                icon={this.scoutIcon}
            />
        });
        if (userMarker) {
            markers.push(userMarker)
        }
        return markers;
    }


    generateUserIcon = (coords) => {
        return (<Marker
            key={"user-marker"}
            position={coords}
        />)
    }
    handleMarkerClose = () => {
        this.setState({ selected: null })
    }
    handleMapClick = (e) => {
        const { setCoordinates } = this.props;

        let obj = { lat: e.latlng.lat, lng: e.latlng.lng }
        this.setState({ userMarker: this.generateUserIcon(obj) })
        setCoordinates(obj);


    }

    render() {
        const { results, filterTypes, selectedLoc } = this.props;
        const { selected } = this.state;
        let center = { lat: 61.29, lng: 23.45 };
        let zoom = 8;
        let windowWidth = window.screen.width;
        if (selectedLoc !== null) {
            center = selectedLoc.location_geo;
            zoom = 11;
        }


        return (
            <div className="map-container">
                <div className="map">
                    <MapHeader types={filterTypes} results={results} renderMenu resultAmount={results.length} data={results} />
                    <LeafletMap
                        center={center}
                        zoom={zoom}
                        maxZoom={15}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={windowWidth >= 768}
                        animate={true}
                        easeLinearity={0.35}
                        onClick={this.handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup
                            showCoverageOnHover
                            iconCreateFunction={this.createClusterCustomIcon}>
                            {this.generateMarkers()}
                        </MarkerClusterGroup>

                    </LeafletMap>
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