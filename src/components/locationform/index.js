import React from "react";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"
import { postFormData, postEditData } from "../../actions/SearchResultsActions"
import SelectInput from "../inputform/SelectInput"
import TextInput from "./textInput"
import "./locationform.css"

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const initialState = {}
class LocationForm extends React.Component {
    state = {

    }

    handleFormSubmit = (e, edit) => {
        e.preventDefault();
        let emptyFound = false;
        // let dataObj = { location_name: null, object_name: null, object_type: "city", location_geo: { lat: null, lng: null }, location_description: null, location_category: null, location_pricing: null, filters: [], location_owner: null, location_mail: null, location_website: null, location_phone: null }
        let dataObj = {};
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
        console.log(this.state, emptyFound);
        if (!emptyFound) {
            let stateKeys = Object.keys(this.state);
            console.log(JSON.stringify(this.state))
            if (edit) {
                let checkboxes = document.getElementsByClassName("form-check-input");
                if (!dataObj.filters) {
                    dataObj.filters = [];
                }
                for (let i = 0; i < checkboxes.length; ++i) {
                    let chbox = checkboxes[i];
                    if (chbox.id === "box-location_accepted" && chbox.defaultChecked !== chbox.checked) {
                        dataObj.location_accepted = chbox.checked;
                    } else if (chbox.checked && chbox.id !== "box-location_accepted") {
                        dataObj.filters.push(chbox.id.split("-")[1]);
                    }

                }
            }

            for (let i = 0; i < stateKeys.length; i++) {
                let key = stateKeys[i];

                //console.log(this.state.key)
                if (key.includes("box") && this.state[key] && !edit) {
                    let splitted = key.split("-");
                    if (!dataObj.filters) {
                        dataObj.filters = [];
                    }
                    dataObj.filters.push(splitted[1]);
                } else if (key === "location_geo") {
                    if (this.state[key]) {
                        let splittedGeo = this.state[key].split(",");
                        if (splittedGeo.length === 2) {
                            let geoObj = { lat: splittedGeo[0], lng: splittedGeo[1] };
                            dataObj.location_geo = geoObj;
                        } else {
                            let geoItem = document.getElementById("location_geo")
                            geoItem.value = ""
                            return;
                        }
                    }

                } else {
                    dataObj[key] = this.state[key];
                }


            }
            // check if form was from edit page or main page
            if (edit) {
                this.handleEditSubmit(dataObj)
            } else {
                dataObj["object_type"] = "city";
                if (!dataObj.location_category) {
                    let newTypes = [...this.props.typeFilters];
                    newTypes.splice(0, 1);
                    dataObj.location_category = newTypes[0].category_id;
                }
                console.log(dataObj)
                this.submitForm(dataObj, false);

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
                    onClick: () => this.submitForm(obj, true)
                },
                {
                    label: 'Ei',

                }
            ]
        });
    };
    submitForm = (data, edit) => {
        const { editPageObj, postEditData, postFormData } = this.props;


        if (edit) {
            data["location_id"] = editPageObj.location_id;
            postEditData(data);
            this.props.handleClose();
        } else {
            postFormData(data).then(res => {
                console.log(res);
                if (res) {
                    this.setState(initialState);
                }
            });
            //this.setState
        }


    }
    handleEditSubmit = (data) => {
        this.askForConfirmation(data);

    }
    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        console.log(e.target.id, value);
        if (e.target.id === "location_category") {
            let id = e.target.options[e.target.options.selectedIndex].id;
            value = id;
        }
        this.setState({ [e.target.id]: value });
    }

    generateCheckBoxes = (arr, has) => {
        console.log(arr);
        let boxes = arr.map(item => {
            if (item.object_type !== "nofilter") {
                return (<div className="form-check form-check-inline">
                    <input onClick={this.handleChange} type="checkbox" className="form-check-input" id={"box-" + item.filter_id} defaultChecked={has.filter((val) => val === item.object_name).length > 0} />
                    <label className="form-check-label" htmlFor={item.object_name}>{item.object_name}</label>
                </div>)
            } else {
                return null;
            }
        })
        return boxes;
    }
    generateAcceptBox = (obj) => {
        return (<div className="form-check form-check-inline">
            <input onClick={this.handleChange} type="checkbox" className="form-check-input" id={"box-location_accepted"} defaultChecked={obj.location_accepted} />
            <label className="form-check-label" htmlFor={"Näytä käyttäjälle"}>{"Näytä käyttäjälle"}</label>
        </div>)
    }
    static getDerivedStateFromProps(newProps, currentState) {
        // on coordinates props change (map was clicked),
        // change the geo field coordinates
        if (newProps.coords !== currentState.location_geo && newProps.coords !== null) {
            return { location_geo: newProps.coords.lat + "," + newProps.coords.lng };
        } else
            return null;
    }


    getTextForm = (rows, text, helper, description, id) => {
        return (
            <div className="form-group">
                <label htmlFor="text-area">{text}</label>
                <textarea defaultValue={description !== null ? description : ""} onChange={this.handleChange} className="form-control" id={id} rows={rows}></textarea>
                <small id={text + "Help"} className="form-text text-muted">{helper}</small>
            </div>)
    }
    generateEditForm = () => {
        const { typeFilters, commonFilters, editPageObj } = this.props;
        let newTypes = [...typeFilters];
        newTypes.splice(0, 1);
        // generate form for edit page
        return (<form className="needs-validation" noValidate>
            <TextInput defaultValue={editPageObj.location_name} handleChange={this.handleChange} id="location_name" placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka" required={true} />
            <SelectInput
                id=""
                defaultValue={editPageObj.location_category}
                data={newTypes}
                title="Retkipaikan tyyppi"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput defaultValue={editPageObj.object_name} handleChange={this.handleChange} id="object_name" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti" size="col-md-6" required={true} />
                <TextInput defaultValue={editPageObj.location_geo.lat + "," + editPageObj.location_geo.lng} handleChange={this.handleChange} id="location_geo" placeholder="Koordinaatit" helper="Valitse koordinaatit kartalta" text="Koordinaatit" size="col-md-6" required={true} />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta", editPageObj.location_description, "location_description")}
            {this.getTextForm("3", "Vuokrahintatiedot", "Kirjoita hintatietoja, jos niitä on", editPageObj.location_pricing, "location_pricing")}
            {this.generateCheckBoxes(commonFilters, editPageObj.filters)}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput defaultValue={editPageObj.location_owner} handleChange={this.handleChange} id="location_owner" placeholder="Esimerkkiomistaja" helper="Kirjoita retkipaikan omistaja (lippukunta, kaupunki, srk tms.)" text="Omistaja" size="col-md-3" required={true} />
                <TextInput defaultValue={editPageObj.location_website} handleChange={this.handleChange} id="location_website" placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" required={false} />
                <TextInput defaultValue={editPageObj.location_mail} handleChange={this.handleChange} id="location_mail" placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" required={false} />
                <TextInput defaultValue={editPageObj.location_phone} handleChange={this.handleChange} id="location_phone" placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" required={false} />
            </div>
            {this.generateAcceptBox(editPageObj)}
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
            <TextInput handleChange={this.handleChange} id="location_name" placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka*" required={true} />
            <SelectInput
                id=""
                data={newTypes}
                title="Retkipaikan tyyppi*"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="object_name" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti*" size="col-md-6" required={true} />
                <TextInput handleChange={this.handleChange} id="location_geo" placeholder="Koordinaatit" helper="Valitse koordinaatit kartalta" text="Koordinaatit*" size="col-md-6" required={true} />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta", null, "location_description")}
            {this.getTextForm("3", "Vuokrahintatiedot", "Kirjoita hintatietoja, jos niitä on", null, "location_pricing")}
            {this.generateCheckBoxes(commonFilters, [])}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="location_owner" placeholder="Esimerkkiomistaja" helper="Kirjoita retkipaikan omistaja (lippukunta, kaupunki, srk tms.)" text="Omistaja/Yhteystieto*" size="col-md-3" required={true} />
                <TextInput handleChange={this.handleChange} id="location_website" placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="location_mail" placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="location_phone" placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" required={false} />
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
        console.log(this.state);
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
export default connect(mapStateToProps, { removeFilter, postEditData, postFormData })(LocationForm);

