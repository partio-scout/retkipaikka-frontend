import React from "react";
import "./map.css";
import MapHeader from "./header/MapHeader"
import SideSlider from "./header/sideSlider"
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet'
import L from "leaflet"
import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster';
import Spinner from "../shared/Spinner"
import { connect } from "react-redux";
import { setCoordinates, selectMapHeaderLocation } from "../../actions/MapActions"



class Map extends React.Component {
    state = {
        selected: null,
        userMarker: null,
        markerRenderCount: 500
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
    generateMarkers = (results) => {
        const { selectMapHeaderLocation } = this.props;
        const { userMarker } = this.state;

        let markers = results.map((reg, i) => {
            return <Marker
                key={reg.location_id + i}
                position={reg.location_geo}
                onClick={() => selectMapHeaderLocation(reg)}
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
        const { setCoordinates, formOpen } = this.props;
        if (formOpen) {
            // window.scrollTo({ top: 250, behavior: 'smooth' })
            let obj = { lat: e.latlng.lat, lng: e.latlng.lng }
            this.setState({ userMarker: this.generateUserIcon(obj) })
            setCoordinates(obj);
        }



    }
    changeLocationCount = (val) => {
        this.setState({ markerRenderCount: val })
    }


    render() {
        const { results, filterTypes, selectedLoc, t, language } = this.props;
        const { selected, markerRenderCount } = this.state;
        let center = { lat: 61.29, lng: 23.45 };
        let zoom = 8;
        let windowWidth = window.screen.width;
        if (selectedLoc !== null) {
            center = selectedLoc.location_geo;
            zoom = 11;
        }
        let splittedRes = results;
        if (markerRenderCount !== "all") {
            splittedRes = results.slice(0, parseInt(markerRenderCount))
        }
        return (
            <div className="map-container">
                <div className="map">
                    <MapHeader t={t} language={language} changeLocationCount={this.changeLocationCount} types={filterTypes} renderMenu resultAmount={splittedRes.length} data={splittedRes} />
                    <LeafletMap
                        center={center}
                        zoom={zoom}
                        preferCanvas={true}
                        maxZoom={15}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={windowWidth >= 768}
                        animate={true}
                        easeLinearity={0.35}
                        onClick={this.handleMapClick}
                        onmouseover={() => window.scrollTo({ top: 250, behavior: 'smooth' })}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MarkerClusterGroup
                            showCoverageOnHover
                            iconCreateFunction={this.createClusterCustomIcon}>
                            {this.generateMarkers(splittedRes)}
                        </MarkerClusterGroup>

                    </LeafletMap>
                    {/* {selected !== null && <SideSlider t={t} class={" map-slider"} handleClose={this.handleMarkerClose} data={selected} />} */}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        selectedLoc: state.map.selectedLocation,
        filterTypes: state.filters.locationTypeFilterList,
        language: state.general.language

    }
}
export default connect(mapStateToProps, { selectMapHeaderLocation, setCoordinates })(Map);