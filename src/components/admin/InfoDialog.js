import React from "react";
import "./mapHeader.css";
import { connect } from "react-redux";
import { selectLocation } from "../../../actions/MapActions"

class InfoDialog extends React.Component {
    generateFromSingleData = (obj) => {
        const { selectLocation } = this.props;
        return (
            <div>
                <h4>Nimi:</h4>
                <span>{obj.name}</span>
                <br />
                <h4>Kuvaus:</h4>
                <span> {obj.description}</span>
                <br />
                <h4>Yhteystiedot:</h4>
                <span>{obj.data.ownerName}</span>
                <br />
                <span>{obj.data.website}</span>
                <br />
                <span>{obj.data.mail}</span>
                <br />
                <span>{obj.data.phone}</span>
                <br />
                <br />
                <h4 onClick={() => selectLocation(obj)} ><u>Näytä kartalla</u></h4>

            </div>
        )
    }
    getText = () => {
        return "<-";
    }


    render() {
        console.log("render slider")
        let className = "map-side-slider component"
        return (
            <div className={this.props.class ? className + this.props.class : className}>
                <button onClick={this.props.handleClose}>{this.getText()}</button>
                <div className="side-slider-data">
                    {this.generateFromSingleData(this.props.data)}
                </div>

            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        coords: state.map.coords,
        filterTypes: state.filters.locationTypeFilterList
    }
}
export default connect(mapStateToProps, { selectLocation })(InfoDialog);