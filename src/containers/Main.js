import React from "react";
import "./styles/main.css";
import Map from "../components/map/Map"
import Header from "../components/header/Header"
import InputContainer from "../components/inputform/InputContainer"
import LocationForm from "../components/locationform/LocationForm"
import { connect, batch } from "react-redux";
import { fetchLocations } from "../actions/SearchResultsActions"
import { fetchFilters, fetchRegionsAndMunicipalities } from "../actions/FilterActions"
import { setLoading } from "../actions/GeneralActions"
import Spinner from "../components/shared/Spinner";


class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formOpen: false
        }
        this.handleInitialFetch();

    }


    handleInitialFetch = () => {
        const { fetchLocations, setLoading, fetchFilters, results, filtersLoc, filtersCom, regions, municipalities, fetchRegionsAndMunicipalities } = this.props;

        setLoading(true);
        if (results.searchResults.length === 0) {
            fetchLocations(true, true);
        }
        if (filtersLoc.length === 0 || filtersCom.length === 0) {
            fetchFilters();
        }
        if (regions.length === 0 || municipalities.length === 0) {
            fetchRegionsAndMunicipalities();
        }
        setLoading(false)






    }
    handleFormOpen = () => {
        this.setState({ formOpen: !this.state.formOpen })
    }
    handleReOpen = () => {
        this.setState({ formOpen: false }, () => {
            this.setState({ formOpen: true })
        })
    }
    render() {
        const { location, t, loading } = this.props;
        const { formOpen } = this.state;
        console.log("render")
        return (
            <div className="frontpage-container">
                <div className="frontpage-image-container">
                    <img alt="frontpage_image" src={_IMAGES_PATH_ + "frontpage_img.jpg"} />
                    <h2 className="main-header">Partion retkipaikat</h2>

                </div>
                <InputContainer t={t} adminPage={false} />

                <Map t={t} />
                <h4 onClick={this.handleFormOpen} className="main-input-form" >{t("main.inform")} <img className={formOpen ? "input-form-icon-open" : "input-form-icon"} src={_ICON_PATH_ + "arrow.svg"}></img></h4>
                {formOpen && <LocationForm t={t} handleClose={this.handleReOpen} />}


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
        municipalities: state.filters.municipalities,
        loading: state.general.loading

    }
}
export default connect(mapStateToProps, { fetchLocations, fetchFilters, setLoading, fetchRegionsAndMunicipalities })(Main);