import React from "react";
import "./inputform.css"
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TagBar from "../tagbar";
import { connect } from "react-redux";
import { addFilter } from "../../actions/FilterActions";
import { filterFromResults } from "../../actions/SearchResultsActions";

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
        const { filterFromResults, results, tags } = this.props;

        filterFromResults(results.searchResults, tags);
    }
    checkTags = (tag) => {
        const { tags } = this.props;
        let vals = Object.values(tags);
        for (let i = 0; i < vals.length; i++) {
            if (vals[i].filter(t => t.text === tag.text).length !== 0) {
                return false;
            }
        }
        return true;
    }
    render() {
        const { results } = this.props;

        return (
            <div>
                <div className="inputform-container">
                    <div className="inputform-inputs">
                        <TextInput data={results.searchResults} applyFilter={this.addFilter} title="Etsi paikannimen perusteella" />
                        <SelectInput data={this.typeArr} applyFilter={this.addFilter} title="Retkipaikan tyyppi" />
                        <SelectInput data={this.filterArr} applyFilter={this.addFilter} title="Suodattimet" />
                        <span className="inputform-inputs-button">
                            <button onClick={this.filterResults}>Suodata</button>
                        </span>
                    </div>
                </div>
                <TagBar />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tags: state.filters,
        results: state.searchResults
    }
}
export default connect(mapStateToProps, { addFilter, filterFromResults })(InputContainer);