import React from "react";
import "./inputform.css"
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TagBar from "../tagbar";
import { connect } from "react-redux";
import { addFilter } from "../../actions/FilterActions";
import { filterFromResults } from "../../actions/SearchResultsActions";
import { resetLocation } from "../../actions/MapActions"

class InputContainer extends React.Component {

    addFilter = (obj) => {
        const { addFilter } = this.props;
        if (this.checkTags(obj)) {
            addFilter(obj);
        }
    }

    filterResults = () => {
        const { filterFromResults, results, tags, resetLocation } = this.props;
        resetLocation();
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
    render() {
        const { results, filtersLoc, filtersCom, adminPage, regions, municipalities } = this.props;
        let allArr = regions.concat(municipalities);

        return (
            <div>

                <div className="inputform-container" style={adminPage ? { backgroundColor: 'white' } : {}}>
                    {/* <div className="inputform-inputs form-row form-group"> */}
                    <form className="inputform-inputs" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <TextInput data={allArr} applyFilter={this.addFilter} id={"header-text"} title="Paikannimi" customClassName="inputform-select form-group col-md-4 col-sm-11 " />
                            <SelectInput id={"-cat"} data={filtersLoc} applyFilter={this.addFilter} title="Tyyppi" useFiltering={true} customClassName="form-group col-md-3 col-sm-11 " />
                            <SelectInput id={"filt"} data={filtersCom} applyFilter={this.addFilter} title="Suodattimet" useFiltering={true} customClassName="form-group col-md-3 col-sm-11 " />
                            <div className="inputform-inputs-button form-group col-md-1 col-sm-11 ">
                                <button className="btn btn-primary" onClick={this.filterResults}>Suodata</button>
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
const mapStateToProps = state => {
    return {
        tags: state.filters,
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList,
        regions: state.filters.regions,
        municipalities: state.filters.municipalities
    }
}
export default connect(mapStateToProps, { addFilter, filterFromResults, resetLocation })(InputContainer);