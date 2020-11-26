import React from "react";
import "./inputform.css"
import AutoCompleteInput from "./AutoCompleteInput";
import SelectInput from "./SelectInput";
import TagBar from "../tagbar/TagBar";
import { connect } from "react-redux";
import { addFilter } from "../../actions/FilterActions";
import { filterFromResults, createFilter } from "../../actions/SearchResultsActions";
import { resetLocation } from "../../actions/MapActions"

class InputContainer extends React.Component {

    addFilter = (obj) => {
        const { addFilter } = this.props;
        if (this.checkTags(obj)) {
            addFilter(obj);
        }
    }

    filterResults = () => {
        const { tags, resetLocation, results, createFilter, limitedFields, filterFromResults } = this.props;
        resetLocation();
        //createFilter(tags, limitedFields);
        filterFromResults(results.searchResults, tags);
    }
    checkTags = (tag) => {
        const { tags } = this.props;
        let vals = Object.values(tags);
        //tags has 5 elements
        // first 3 are the tag arrays
        for (let i = 0; i < 3; i++) {
            if (vals[i].filter(t => t.object_name === tag.object_name).length !== 0) {
                return false;
            }
        }
        //location_place
        //category_name
        //filter_name
        return true;
    }
    checkButtonDisabled = () => {
        const { tags, previousFilter } = this.props;
        let temp = {
            commonFilters: tags.commonFilters,
            locationFilters: tags.locationFilters,
            locationTypeFilters: tags.locationTypeFilters
        }
        return JSON.stringify(temp) == JSON.stringify(previousFilter)
    }
    render() {
        const { filtersLoc, filtersCom, adminPage, regions, municipalities, t, language } = this.props;
        let allArr = regions.concat(municipalities);
        let textInput_ph = t("main.location_placeholder")

        return (
            <div style={{ "backgroundColor": "white" }}>
                <div className="inputform-container" style={adminPage ? { backgroundColor: 'white' } : {}}>
                    {/* <div className="inputform-inputs form-row form-group"> */}
                    <form className="inputform-inputs" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <AutoCompleteInput t={t} data={allArr} applyFilter={this.addFilter} id={"header-text"} title={t("main.location")} customClassName="inputform-select fix-ipad form-group col-sm-11  col-md-4 " />
                            <SelectInput language={language} id={"-cat"} data={filtersLoc} applyFilter={this.addFilter} title={t("main.type")} useFiltering={true} customClassName="form-group fix-ipad col-sm-11  col-md-3" />
                            <SelectInput language={language} id={"filt"} data={filtersCom} applyFilter={this.addFilter} title={t("main.filters")} useFiltering={true} customClassName="form-group fix-ipad col-sm-11  col-md-3" />
                            <div className="inputform-inputs-button form-group col-md-1 col-sm-11 ">
                                <button className="btn btn-primary" disabled={this.checkButtonDisabled()} onClick={this.filterResults}>{t("main.filter")}</button>
                            </div>
                        </div>

                        {/* </div> */}
                    </form>

                </div>
                <TagBar adminPage={adminPage} />
            </div>
        )
    }
}
InputContainer.defaultProps = {
    limitedFields: true
}
const mapStateToProps = state => {
    return {
        tags: state.filters,
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList,
        regions: state.filters.regions,
        municipalities: state.filters.municipalities,
        language: state.general.language,
        previousFilter: state.searchResults.previousFilter
    }
}
export default connect(mapStateToProps, { addFilter, filterFromResults, createFilter, resetLocation })(InputContainer);