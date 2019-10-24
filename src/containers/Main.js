import React from "react";
import "./styles/main.css";
import Map from "../components/map"
import Header from "../components/header"
import InputContainer from "../components/inputform"
import LocationForm from "../components/locationform"
import { connect } from "react-redux";
import { fetchLocations } from "../actions/SearchResultsActions"
import { fetchFilters } from "../actions/FilterActions"
//import {imagesPath} from "../paths"

class Main extends React.Component {
    componentWillMount() {
        const { fetchLocations, fetchFilters, results, filtersLoc, filtersCom } = this.props;
        if (results.searchResults.length === 0) {
            fetchLocations();
        }
        if (filtersLoc.length === 0 || filtersCom.length === 0) {
            fetchFilters();
        }

    }

    render() {
        const { location } = this.props;
        const imagesPath = "/images/";
        console.log(imagesPath + "frontpage_img.jpg")
        return (
            <div className="frontpage-container">
                <Header location={location} />
                <div className="frontpage-image-container">
                    <img alt="frontpage_image" src={imagesPath + "frontpage_img.jpg"} />
                    <h2 className="main-header">Partio retkipaikat</h2>
                </div>
                <InputContainer />
                <Map />
                <LocationForm />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList
    }
}
export default connect(mapStateToProps, { fetchLocations, fetchFilters })(Main);