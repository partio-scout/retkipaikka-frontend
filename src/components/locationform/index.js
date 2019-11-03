import React from "react";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"
import SelectInput from "../inputform/SelectInput"
import TextInput from "./textInput"
import "./locationform.css"

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class LocationForm extends React.Component {
    state = {

    }

    handleFormSubmit = (e, edit) => {
        e.preventDefault();
        let emptyFound = false;
        let dataObj = { name: null, text: null, geo: { lat: null, lng: null }, description: null, type: null, has: [], data: { ownerName: null, mail: null, website: null, phone: null } }
        var forms = document.getElementsByClassName('needs-validation');
        // check if all required fields have value in
        Array.prototype.filter.call(forms, function (form) {
            if (form.checkValidity() === false) {
                e.stopPropagation();
                emptyFound = true;
            }
            form.classList.add('was-validated');
        })
        // if all required fields had value,
        // loop through state and put the data in object
        if (!emptyFound) {
            let stateKeys = Object.keys(this.state);
            console.log(JSON.stringify(this.state))
            for (let i = 0; i < stateKeys.length; i++) {
                let key = stateKeys[i];
                //console.log(this.state.key)
                if (key.includes("box") && this.state[key]) {
                    let splitted = key.split("-");
                    dataObj.has.push(splitted[1]);
                } else if (key === "geo") {
                    if (this.state[key]) {
                        let splittedGeo = this.state[key].split(",");
                        if (splittedGeo.length === 2) {
                            let geoObj = { lat: splittedGeo[0], lng: splittedGeo[1] };
                            dataObj.geo = geoObj;
                        } else {
                            let geoItem = document.getElementById("geo")
                            geoItem.value = ""
                            return;
                        }
                    }

                } else {
                    switch (key) {
                        case "phone":
                        case "ownerName":
                        case "mail":
                        case "website":
                            dataObj.data[key] = this.state[key]
                            break;
                        default:
                            dataObj[key] = this.state[key];
                    }


                }
            }
            // check if form was from edit page or main page
            if (edit) {
                this.handleEditSubmit(dataObj)
            } else {
                this.submitForm(dataObj);
            }

        }
    }

    askForConfirmation = (obj) => {
        confirmAlert({
            title: 'Retkipaikan muokkaaminen',
            message: 'Haluatko tallentaa tekemäsi muokkaukset?',
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => alert("handleEditSubmit")
                },
                {
                    label: 'Ei',

                }
            ]
        });
    };
    submitForm = (data) => {
        console.log(data, "meni läpi")
    }
    handleEditSubmit = (data) => {
        this.askForConfirmation()

    }
    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        console.log(e.target.id, value);
        this.setState({ [e.target.id]: value });
    }

    generateCheckBoxes = (arr, has) => {
        console.log(arr);
        let boxes = arr.map(item => {
            if (item.type !== "nofilter") {
                return (<div className="form-check form-check-inline">
                    <input onClick={this.handleChange} type="checkbox" className="form-check-input" id={"box-" + item.text} defaultChecked={has.filter((val) => val === item.text).length > 0} />
                    <label className="form-check-label" htmlFor={item.text}>{item.text}</label>
                </div>)
            } else {
                return null;
            }
        })
        return boxes;
    }
    static getDerivedStateFromProps(newProps, currentState) {
        // on coordinates props change (map was clicked),
        // change the geo field coordinates
        if (newProps.coords !== currentState.geo && newProps.coords !== null) {
            return { geo: newProps.coords.lat + "," + newProps.coords.lng };
        } else
            return null;
    }


    getTextForm = (rows, text, helper, description) => {
        return (
            <div className="form-group">
                <label htmlFor="text-area">{text}</label>
                <textarea defaultValue={description !== null ? description : ""} onChange={this.handleChange} className="form-control" id="description" rows={rows}></textarea>
                <small id={text + "Help"} className="form-text text-muted">{helper}</small>
            </div>)
    }
    generateEditForm = () => {
        const { typeFilters, commonFilters, editPageObj } = this.props;
        let newTypes = [...typeFilters];
        newTypes.splice(0, 1);
        // generate form for edit page
        return (<form className="needs-validation" noValidate>
            <TextInput defaultValue={editPageObj.name} handleChange={this.handleChange} id="name" placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka" required={true} />
            <SelectInput
                defaultValue={editPageObj.propertyType}
                data={newTypes}
                title="Retkipaikan tyyppi"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput defaultValue={editPageObj.text} handleChange={this.handleChange} id="text" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti" size="col-md-6" required={true} />
                <TextInput defaultValue={editPageObj.geo.lat + "," + editPageObj.geo.lng} handleChange={this.handleChange} id="geo" placeholder="Koordinaatit" helper="Valitse koordinaatit kartalta" text="Koordinaatit" size="col-md-6" required={true} />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta", editPageObj.description)}
            {this.generateCheckBoxes(commonFilters, editPageObj.has)}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput defaultValue={editPageObj.data.ownerName} handleChange={this.handleChange} id="ownerName" placeholder="Esimerkkiomistaja" helper="Kirjoita retkipaikan omistaja (lippukunta, kaupunki, srk tms.)" text="Omistaja" size="col-md-3" required={true} />
                <TextInput defaultValue={editPageObj.data.website} handleChange={this.handleChange} id="website" placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" required={false} />
                <TextInput defaultValue={editPageObj.data.mail} handleChange={this.handleChange} id="mail" placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" required={false} />
                <TextInput defaultValue={editPageObj.data.phone} handleChange={this.handleChange} id="phone" placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" required={false} />
            </div>
            <button onClick={(e) => this.handleFormSubmit(e, true)} type="submit" className="btn btn-primary">Hyväksy</button>
        </form>)
        // data: { name: null, website:
    }


    generateLocationForm = () => {
        const { typeFilters, commonFilters, editPageObj } = this.props;
        let newTypes = [...typeFilters];
        newTypes.splice(0, 1);
        // generate from for main page
        return (<form className="needs-validation" noValidate>
            <TextInput handleChange={this.handleChange} id="name" placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka*" required={true} />
            <SelectInput
                data={newTypes}
                title="Retkipaikan tyyppi*"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="text" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti*" size="col-md-6" required={true} />
                <TextInput handleChange={this.handleChange} id="geo" placeholder="Koordinaatit" helper="Valitse koordinaatit kartalta" text="Koordinaatit*" size="col-md-6" required={true} />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta", null)}
            {this.getTextForm("3", "Vuokrahintatiedot", "Kirjoita hintatietoja, jos niitä on", null)}
            {this.generateCheckBoxes(commonFilters, [])}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="ownerName" placeholder="Esimerkkiomistaja" helper="Kirjoita retkipaikan omistaja (lippukunta, kaupunki, srk tms.)" text="Omistaja/Yhteystieto*" size="col-md-3" required={true} />
                <TextInput handleChange={this.handleChange} id="website" placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="mail" placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="phone" placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" required={false} />
            </div>
            <button onClick={(e) => this.handleFormSubmit(e, false)} type="submit" className="btn btn-primary">Lähetä</button>
        </form>)
    }

    render() {
        const { editPageObj } = this.props;
        // editPageObj comes from edit page,
        // it it's not undefined, generate edit form
        let form = editPageObj ? this.generateEditForm() : this.generateLocationForm();
        let className = "form-container";
        className = editPageObj ? "edit-form-container" : className

        return (
            <div className={className}>
                {!editPageObj && <h4>Ilmoita retkipaikka!</h4>}
                {form}

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tagList: state.filters,
        coords: state.map.coords,
        typeFilters: state.filters.locationTypeFilterList,
        commonFilters: state.filters.commonFilterList
    }
}
export default connect(mapStateToProps, { removeFilter })(LocationForm);

