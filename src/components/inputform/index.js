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
    // sauna
    // järvi lähellä
    // sisämajoitus
    // sisävessa
    //test for commit

    //Laavu
    // Kämppä
    // Alue
    filterArr = [{ type: "nofilter", text: "Ei suodattimia" }, { type: "filter", text: "Sauna" }, { type: "filter", text: "Järvi lähellä" }, { type: "filter", text: "Sisämajoitus" }, { type: "filter", text: "Sisävessa" }]
    typeArr = [{ type: "nolocationtype", text: "Kaikki" }, { type: "locationtype", text: "Laavu" }, { type: "locationtype", text: "Kämppä" }, { type: "locationtype", text: "Alue" }]
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
            if (vals[i].filter(t => t.text === tag.text).length !== 0) {
                return false;
            }
        }
        return true;
    }
    render() {
        const { results, filtersLoc, filtersCom } = this.props;
        console.log(filtersCom, "commons")
        return (
            <div>
                <div className="inputform-container">
                    {/* <div className="inputform-inputs form-row form-group"> */}
                    <form className="inputform-inputs" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <TextInput data={results.searchResults} applyFilter={this.addFilter} title="Paikannimi" customClassName="inputform-select form-group col-md-4 col-sm-11 " />
                            <SelectInput data={filtersLoc} applyFilter={this.addFilter} title="Tyyppi" useFiltering={true} customClassName="form-group col-md-3 col-sm-11 " />
                            <SelectInput data={filtersCom} applyFilter={this.addFilter} title="Suodattimet" useFiltering={true} customClassName="form-group col-md-3 col-sm-11 " />
                            <div className="inputform-inputs-button form-group col-md-1 col-sm-11 ">
                                <button className="btn btn-primary" onClick={this.filterResults}>Suodata</button>
                            </div>
                        </div>

                        {/* </div> */}
                    </form>

                </div>
                <TagBar />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tags: state.filters,
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList
    }
}
export default connect(mapStateToProps, { addFilter, filterFromResults, resetLocation })(InputContainer);