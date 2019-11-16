import React from "react";
import "./mapHeader.css";
import moment from "moment"
import { connect } from "react-redux";
import { selectLocation } from "../../../actions/MapActions"

class SideSlider extends React.Component {
    generateFromSingleData = (obj) => {
        const { selectLocation } = this.props;
        return (
            <div>
                <h4>Nimi:</h4>
                <span>{obj.location_name}</span>
                <br />
                <h4>Kuvaus:</h4>
                <span> {obj.location_description}</span>
                <br />
                <h4>Yhteystiedot:</h4>
                <span>Omistaja: </span>
                <span>{obj.location_owner}</span>
                {obj.location_website &&
                    <span>
                        <br />
                        <span>Nettisivu: </span>
                        <span>{obj.location_website}</span>
                    </span>}
                {obj.location_mail &&
                    <span>
                        <br />
                        <span>Sähköposti: </span>
                        <span>{obj.location_mail}</span>
                    </span>}
                {obj.location_phone &&
                    <span>
                        <br />
                        <span>Puhelin: </span>
                        <span>{obj.location_phone}</span>
                    </span>}
                <h4>Tietoa:</h4>
                <span>Lisätty: </span>
                <span>{moment(obj.createdAt).format("DD.MM.YYYY")}</span>
                <br />
                <span>Muokattu: </span>
                <span>{moment(obj.updatedAt).format("DD.MM.YYYY")}</span>
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
export default connect(mapStateToProps, { selectLocation })(SideSlider);