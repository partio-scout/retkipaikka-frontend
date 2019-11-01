import React from "react";

import { connect } from "react-redux";
import { selectLocation } from "../../actions/MapActions"
import LocationForm from "../locationform"
import Draggable from 'react-draggable';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




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
                <button onClick={() => this.handleDelete(obj)} className="btn btn-primary info-button">Poista</button>
                <button onClick={() => this.handleEditClick(obj)} className="btn btn-primary info-button">Muokkaa</button>

            </div>
        )
    }
    static getDerivedStateFromProps(newProps, currentState) {
        // if edit form is opened
        if (currentState.editEnabled !== null) {
            // check if user clicked other location object, in the table
            // if clicked, disable edit form
            if (newProps.data.id !== currentState.editEnabled.id) {
                return { editEnabled: null };
            }
        }
        return null;

    }

    handleDelete = (obj) => {
        confirmAlert({
            title: 'Retkipaikan poistaminen',
            message: 'Haluatko varmasti poistaa retkipaikan ' + obj.name + "?",
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => alert("delete")
                },
                {
                    label: 'Ei',

                }
            ]
        });
    };






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
        console.log("asd")
        return (


            <Draggable
                handle=".move-handle">
                <div style={{ top: clickHeight.height, left: clickHeight.width }} className={customClassName ? className + customClassName : className}>

                    <button className="btn info-close-button" onClick={handleClose}>x</button>
                    <div className="side-slider-data">
                        {this.generateFromSingleData(data)}
                    </div>
                    {editEnabled !== null && <LocationForm editPageObj={data} />}
                    {}

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