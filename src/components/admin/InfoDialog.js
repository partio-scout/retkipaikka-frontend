import React from "react";

import { connect } from "react-redux";
import { selectLocation } from "../../actions/MapActions"

class InfoDialog extends React.Component {
    generateFromSingleData = (obj) => {

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
                <button className="btn btn-primary info-button">Poista</button>
                <button className="btn btn-primary info-button">Muokkaa</button>

            </div>
        )
    }



    render() {
        const { data, customClassName, handleClose, clickHeight } = this.props;
        let className = "admin-info-dialog"

        return (
            <div style={{ top: clickHeight.height, left: clickHeight.width }} className={customClassName ? className + customClassName : className}>
                <button className="btn info-close-button" onClick={handleClose}>x</button>
                <div className="side-slider-data">
                    {this.generateFromSingleData(data)}
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