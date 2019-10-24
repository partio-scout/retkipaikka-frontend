import React from "react";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"
import SelectInput from "../inputform/SelectInput"
import TextInput from "./textInput"
import "./locationform.css"


class TagBar extends React.Component {
    typeArr = [{ type: "locationtype", text: "Valitse" }, { type: "locationtype", text: "Laavu" }, { type: "locationtype", text: "Kämppä" }, { type: "locationtype", text: "Alue" }]
    state = {
        geo: ""
    }
    //propertytypes:
    //laavu, kämppä, alue
    //has:
    //sauna, järvi lähellä, sisämajoitus,sisävessa

    //{ type: "city", name: "Testialue", text: "Turku", geo: { lat: 60.45, lng: 22.26 },
    // propertyType: "Alue", has: ["Järvi lähellä", "Sauna"], 
    //data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    handleFormSubmit = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        let emptyFound = false;
        let dataObj = { name: null, text: null, geo: { lat: null, lng: null }, description: null, type: null, has: [], data: { ownerName: null, mail: null, website: null, phone: null } }
        var forms = document.getElementsByClassName('needs-validation');

        Array.prototype.filter.call(forms, function (form) {
            if (form.checkValidity() === false) {
                e.stopPropagation();
                emptyFound = true;
            }
            form.classList.add('was-validated');
        })
        if (!emptyFound) {
            let stateKeys = Object.keys(this.state);
            for (let i = 0; i < stateKeys.length; i++) {
                let key = stateKeys[i];
                //console.log(this.state.key)
                if (key.includes("box") && this.state[key]) {
                    let splitted = key.split("-");
                    dataObj.has.push(splitted[1]);
                } else if (key === "geo") {
                    let splittedGeo = this.state[key].split(",");
                    if (splittedGeo.length === 2) {
                        let geoObj = { lat: splittedGeo[0], lng: splittedGeo[1] };
                        dataObj.geo = geoObj;
                    } else {
                        let geoItem = document.getElementById("geo")
                        geoItem.value = ""
                        return;
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
            this.submitForm(dataObj);
        }
    }

    submitForm = (data) => {
        console.log(data, "meni läpi")
    }
    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        console.log(e.target.id, value);
        this.setState({ [e.target.id]: value });
    }

    generateCheckBoxes = (arr) => {
        console.log(arr);
        let boxes = arr.map(item => {
            if (item.type !== "nofilter") {
                return (<div className="form-check form-check-inline">
                    <input onClick={this.handleChange} type="checkbox" className="form-check-input" id={"box-" + item.text} />
                    <label className="form-check-label" htmlFor={item.text}>{item.text}</label>
                </div>)
            } else {
                return null;
            }
        })
        return boxes;
    }
    static getDerivedStateFromProps(newProps, currentState) {
        console.log(newProps, "derivedstate");
        console.log(newProps.coords, currentState.geo)
        if (newProps.coords !== currentState.geo && newProps.coords !== null) {
            return { geo: newProps.coords.lat + "," + newProps.coords.lng };
        } else
            return null;
    }


    getTextForm = (rows, text, helper) => {
        return (
            <div className="form-group">
                <label htmlFor="text-area">{text}</label>
                <textarea onChange={this.handleChange} className="form-control" id="description" rows={rows}></textarea>
                <small id={text + "Help"} className="form-text text-muted">{helper}</small>
            </div>)
    }
    generateLocationForm = () => {
        const { coords, typeFilters, commonFilters } = this.props;

        let newTypes = [...typeFilters];
        newTypes.splice(0, 1);
        //const { text, geo, ownerName, website, mail, phone } = this.state;
        return (<form className="needs-validation" noValidate>
            <TextInput handleChange={this.handleChange} id="name" placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka" required={true} />
            <SelectInput
                data={newTypes}
                title="Retkipaikan tyyppi"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="text" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti" size="col-md-6" required={true} />
                <TextInput handleChange={this.handleChange} id="geo" placeholder="Koordinaatit" helper="Valitse koordinaatit kartalta" text="Koordinaatit" size="col-md-6" required={true} />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta")}
            {this.generateCheckBoxes(commonFilters)}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} id="ownerName" placeholder="Esimerkkiomistaja" helper="Kirjoita retkipaikan omistaja (lippukunta, kaupunki, srk tms.)" text="Omistaja" size="col-md-3" required={true} />
                <TextInput handleChange={this.handleChange} id="website" placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="mail" placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" required={false} />
                <TextInput handleChange={this.handleChange} id="phone" placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" required={false} />
            </div>
            <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Lähetä</button>
        </form>)
        // data: { name: null, website: null, mail: null, phone: null }
    }

    render() {
        const { coords } = this.props;
        console.log(this.state);
        return (
            <div className="form-container">
                <h4>Ilmoita retkipaikka!</h4>
                {this.generateLocationForm()}
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
export default connect(mapStateToProps, { removeFilter })(TagBar);

