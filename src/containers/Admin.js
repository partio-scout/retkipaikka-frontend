import React from "react";
import "./styles/main.css";
import Header from "../components/header/Header"
import TextInput from "../components/locationform/textInput";
import AdminPanel from "../components/admin/AdminPanel"
import AdminSettings from "../components/admin/AdminSettings"
import LocationList from "../components/admin/LocationList"
import FilterHandler from "../components/admin/FilterHandler";
import { fetchLocations } from "../actions/SearchResultsActions"
import { login, checkLoginStatus } from "../helpers/UserHelper";
import { fetchFilters, fetchRegionsAndMunicipalities } from "../actions/FilterActions"
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";


class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            element: "locations"
        }

        this.handleInitialFetch();


    }

    handleInitialFetch = () => {
        const { fetchLocations, fetchFilters, fetchRegionsAndMunicipalities, results, filtersLoc, filtersCom, regions, municipalities } = this.props;
        if (results.searchResults.length === 0) {
            fetchLocations(true);
            fetchLocations(false);
        }
        if (filtersLoc.length === 0 || filtersCom.length === 0) {
            fetchFilters();
        }
        if (regions.length === 0 || municipalities.length === 0) {
            fetchRegionsAndMunicipalities();
        }
    }



    handleMenuClick = (e) => {
        let type = e.target.id;
        if (type) {
            this.setState({ element: type })
        }
    }

    getAdminPanel = () => {
        const { element } = this.state;
        const { t } = this.props;
        let renderElement = "";
        console.log(element)
        switch (element) {
            case "locations":
            case "notifications":
                renderElement = <LocationList t={t} type={element} />
                break;
            case "filters":
                renderElement = <FilterHandler t={t} />
                break;
            case "settings":
                renderElement = <AdminSettings t={t} />
                break;
            default:
                renderElement = <h3>Testi</h3>
                break;
        }


        return (
            <div>
                <AdminPanel t={t} selectedTab={element} handleClick={this.handleMenuClick} />
                <div className="admin-data-container">
                    {renderElement}
                </div>

                {/* <iframe width="100%" height="800" src="http://localhost:3000/" frameborder="0" allowfullscreen></iframe> */}
            </div>
        )
    }


    render() {
        const { t } = this.props;
        let renderElement = this.getAdminPanel()
        return (
            <div className="frontpage-container">
                {renderElement}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList,
        regions: state.filters.regions,
        municipalities: state.filters.municipalities
    }
}
export default connect(mapStateToProps, { fetchLocations, fetchFilters, fetchRegionsAndMunicipalities })(Admin);