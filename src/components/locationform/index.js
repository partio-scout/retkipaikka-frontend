import React from "react";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"
import SelectInput from "../inputform/SelectInput"
import TextInput from "./textInput"
import "./locationform.css"


class TagBar extends React.Component {
    typeArr = [{ type: "locationtype", text: "Laavu" }, { type: "locationtype", text: "Kämppä" }, { type: "locationtype", text: "Alue" }]
    state = {
        // name: null,
        // location: { name: null, geo: null },
        // propertyType: null,
        // has: [],
        // data: { name: null, website: null, mail: null, phone: null }

    }
    //propertytypes:
    //laavu, kämppä, alue
    //has:
    //sauna, järvi lähellä, sisämajoitus,sisävessa

    //{ type: "city", name: "Testialue", text: "Turku", geo: { lat: 60.45, lng: 22.26 }, propertyType: "Alue", has: ["Järvi lähellä", "Sauna"], 
    //data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.id]: value });
    }
    handleSelectInput = (value) => {

    }
    generateCheckBoxes = (arr) => {
        let boxes = arr.map(item => {
            return (<div className="form-check form-check-inline">
                <input onClick={this.handleChange} type="checkbox" className="form-check-input" id={item} />
                <label className="form-check-label" htmlFor={item}>{item}</label>
            </div>)
        })
        return boxes;
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
        let arr = ["Järvi lähellä", "Sauna", "Sisämajoitus", "Sisävessa"];
        //const { Retkipaikka, Sijainti, Koordinaatit, Lippukunta, Verkkosivu, Sähköposti, Puhelinnumero } = this.state;
        return (<form>
            <TextInput handleChange={this.handleChange} placeholder="Esimerkkipaikka" helper="Kirjoita retkipaikan nimi" text="Retkipaikka" />
            <SelectInput
                data={this.typeArr}
                title="Retkipaikan tyyppi"
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikan tyyppi</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti" size="col-md-6" />
                <TextInput handleChange={this.handleChange} placeholder="60.45,22.26" helper="Kirjoita retkipaikan koordinaatit" text="Koordinaatit" size="col-md-6" />
            </div>
            {this.getTextForm("3", "Kuvaus paikasta", "Kirjoita kuvaus retkipaikasta")}
            {this.generateCheckBoxes(arr)}
            <small id={"Help"} className="form-text text-muted form-group">Valitse retkipaikkaa kuvaavat asiat</small>
            <div className="form-row">
                <TextInput handleChange={this.handleChange} placeholder="Hervannan hukat" helper="Kirjoita lippukunnan nimi" text="Lippukunta" size="col-md-3" />
                <TextInput handleChange={this.handleChange} placeholder="www.retkipaikka.fi" helper="Kirjoita kohteen nettisivu" text="Verkkosivu" size="col-md-3" />
                <TextInput handleChange={this.handleChange} placeholder="example@ex.com" helper="Kirjoita sähköposti" text="Sähköposti" size="col-md-3" />
                <TextInput handleChange={this.handleChange} placeholder="0441235678" helper="Kirjoita puhelinnumero" text="Puhelinnumero" size="col-md-3" />
            </div>
            <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Lähetä</button>
        </form>)
        // data: { name: null, website: null, mail: null, phone: null }
    }

    render() {
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
        tagList: state.filters
    }
}
export default connect(mapStateToProps, { removeFilter })(TagBar);

