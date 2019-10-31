import React from "react";

import { connect } from "react-redux";
import { selectLocation } from "../../actions/MapActions"
import LocationForm from "../locationform"
import Draggable from 'react-draggable';


class InfoDialog extends React.Component {
    state = {
        editEnabled: null
    }
    generateFromSingleData = (obj) => {

        return (
            <div>
                <h4 className="move-handle">#{obj.id}</h4>

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
                <button onClick={() => this.handleEditClick(obj)} className="btn btn-primary info-button">Muokkaa</button>

            </div>
        )
    }
    static getDerivedStateFromProps(newProps, currentState) {
        if (currentState.editEnabled !== null) {
            console.log(newProps.data.id, currentState.editEnabled.id)
            if (newProps.data.id !== currentState.editEnabled.id) {
                console.log(newProps.data.id, "newpropsdata")
                return { editEnabled: null };
            }
        }
        return null;

    }






    handleEditClick = (obj) => {
        const { editEnabled } = this.state;
        let value = obj;
        if (editEnabled) {
            value = null;
        }
        this.setState({ editEnabled: value })

    }



    render() {
        const { data, customClassName, handleClose, clickHeight } = this.props;
        const { editEnabled } = this.state;
        let className = "admin-info-dialog"
        console.log(editEnabled, "in render")
        return (
            <Draggable
                handle=".move-handle">
                <div style={{ top: clickHeight.height, left: clickHeight.width }} className={customClassName ? className + customClassName : className}>
                    <button className="btn info-close-button" onClick={handleClose}>x</button>
                    <div className="side-slider-data">
                        {this.generateFromSingleData(data)}
                    </div>
                    {editEnabled !== null && <LocationForm editPageObj={data} />}

                </div>

            </Draggable>



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