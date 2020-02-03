import React from "react";
import moment from "moment"
import { connect } from "react-redux";
import { selectLocation } from "../../actions/MapActions"
import LocationForm from "../locationform"
import Draggable from 'react-draggable';
import TextInput from "../locationform/textInput"
import { deleteLocation } from "../../actions/SearchResultsActions"
import { editFilter, editCategory } from "../../actions/FilterActions"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




class InfoDialog extends React.Component {
    state = {
        editEnabled: null
    }
    generateFromSingleData = (obj) => {
        return (
            <div>
                <h4 className="move-handle">#{obj.location_id}</h4>

                <h4>Nimi:</h4>
                <span>{obj.location_name}</span>
                <br />
                <h4>Kuvaus:</h4>
                <span> {obj.location_description}</span>
                <br />
                {obj.location_pricing &&
                    <span>
                        <h4>Hinnoittelu:</h4>
                        <span> {obj.location_pricing}</span>

                    </span>}

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
                <button onClick={() => this.handleDelete(obj)} className="btn btn-primary info-button">Poista</button>
                <button onClick={() => this.handleEditClick(obj)} className="btn btn-primary info-button">Muokkaa</button>

            </div>
        )
    }
    submitFilterEdit = async (obj) => {
        const { editCategory, editFilter, handleClose } = this.props;
        let langArr = ["en", "sv", "sa"]
        let newObj = {}
        console.log(this.state)
        let type = obj.object_type;
        let idField = type === "locationtype" ? "category_id" : "filter_id"
        newObj[idField] = obj[idField];
        if (this.state[type]) {
            newObj.object_name = this.state[type];
        }
        langArr.forEach(l => {
            let stateVal = this.state[type + "_" + l]
            console.log(type)
            console.log(stateVal)
            if (stateVal) {
                newObj["object_name_" + l] = stateVal
            }
        })

        switch (type) {
            case "locationtype":
                await editCategory(newObj)
                break;
            case "filter":
                await editFilter(newObj)
                break;
        }
        handleClose();

    }

    handleFilterChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.id]: value });

    }

    askForEditConfirmation = (name, title, obj) => {
        confirmAlert({
            title: title + " muokkaaminen",
            message: 'Haluatko tallentaa tekemäsi muokkaukset?',
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => this.submitFilterEdit(obj)
                },
                {
                    label: 'Ei',

                }
            ]
        });
    };
    getForms = (obj) => {
        let textInfo = obj.object_type === "locationtype" ? "kategorian" : "suodattimen"
        let helperInfo = obj.object_type === "locationtype" ? "Kategoria" : "Suodatin"
        return (
            <div className="form-row">
                <TextInput defaultValue={obj.object_name} handleChange={this.handleFilterChange} id={obj.object_type} placeholder="Suomeksi" helper={"Kirjoita lisättävän " + textInfo + " nimi*"} text={helperInfo} size="col-md-3" required={false} />
                <TextInput defaultValue={obj.object_name_sv} handleChange={this.handleFilterChange} id={obj.object_type + "_sv"} placeholder="Ruotsiksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
                <TextInput defaultValue={obj.object_name_sa} handleChange={this.handleFilterChange} id={obj.object_type + "_sa"} placeholder="Saameksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
                <TextInput defaultValue={obj.object_name_en} handleChange={this.handleFilterChange} id={obj.object_type + "_en"} placeholder="Englanniksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
            </div>)
    }
    generateFilterInfo = (obj) => {
        const { handleDelete } = this.props;
        let id = obj.filter_id ? obj.filter_id : obj.category_id;
        let name = obj.object_name
        let title = obj.filter_id ? "Suodattimen " : "Kategorian ";

        return (
            <div>
                <h4 className="move-handle">#{id}</h4>

                <h4>Nimi:</h4>
                {this.getForms(obj)}
                <br />
                <br />
                <button onClick={() => handleDelete(name, title, obj)} className="btn btn-primary info-button">Poista</button>
                <button onClick={() => this.askForEditConfirmation(name, title, obj)} className="btn btn-primary info-button">Tallenna</button>
            </div>
        )

    }

    static getDerivedStateFromProps(newProps, currentState) {
        // if edit form is opened
        if (currentState.editEnabled !== null) {
            // check if user clicked other location object, in the table
            // if clicked, disable edit form
            if (newProps.data.location_id !== currentState.editEnabled.location_id) {
                return { editEnabled: null };
            }
        }
        return null;

    }
    closeFunc = () => {
        return false;
    }

    submitDelete = (obj) => {
        const { deleteLocation, handleClose } = this.props;
        let objToId = { location_id: obj.location_id };

        deleteLocation(objToId);
        handleClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });


    }

    handleDelete = (obj) => {
        confirmAlert({
            title: 'Retkipaikan poistaminen',
            message: 'Haluatko varmasti poistaa retkipaikan ' + obj.location_name + "?",
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => this.submitDelete(obj)
                },
                {
                    label: 'Ei',
                    onClick: () => this.closeFunc()

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
        const { data, customClassName, handleClose, clickHeight, locationPage } = this.props;
        const { editEnabled } = this.state;
        let className = "admin-info-dialog";
        return (
            <Draggable
                handle=".move-handle">
                <div style={{ top: clickHeight.height, left: clickHeight.width }} className={customClassName ? className + customClassName : className}>

                    <button className="btn info-close-button" onClick={handleClose}>x</button>
                    <div className="side-slider-data">
                        {locationPage ? this.generateFromSingleData(data) :
                            this.generateFilterInfo(data)}
                    </div>
                    {editEnabled !== null && <LocationForm handleClose={handleClose} editPageObj={data} />}


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
export default connect(mapStateToProps, { selectLocation, deleteLocation, editFilter, editCategory })(InfoDialog);