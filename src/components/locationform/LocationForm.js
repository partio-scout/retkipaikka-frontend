import React from "react";
import { connect } from "react-redux";
import { removeFilter, getCorrectFilter } from "../../actions/FilterActions"
import { postFormData, postEditData, removeEditImages } from "../../actions/SearchResultsActions"
import SelectInput from "../inputform/SelectInput"
import TextInput from "../shared/TextInput"
import TextArea from "../shared/TextArea"
import CheckBox from "../shared/CheckBox"
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import FormImageUpload from "./FormImageUpload";

import "./locationform.css"
import { askForConfirmation } from "../../helpers/Helpers"
import TextInputGeo from "../shared/TextInputGeo";

const initialState = {}
class LocationForm extends React.Component {
    state = {
        imgArray: [],
        oldImgArray: []
    }

    handleFormSubmit = (e, edit) => {
        e.preventDefault();
        let emptyFound = false;
        // let dataObj = { location_name: null, object_name: null, object_type: "city", location_geo: { lat: null, lng: null }, location_description: null, location_category: null, location_pricing: null, filters: [], location_owner: null, location_mail: null, location_website: null, location_phone: null }
        let dataObj = {};
        !edit && this.checkLocationInputValidity(this.state.location_region)
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
            if (edit) {
                let checkboxes = document.getElementsByClassName("form-check-input");
                if (!dataObj.filters) {
                    dataObj.filters = [];
                }
                for (let chbox of checkboxes) {
                    if (chbox.id === "box-location_accepted" && chbox.defaultChecked !== chbox.checked) {
                        dataObj.location_accepted = chbox.checked;
                    } else if (chbox.checked && chbox.id !== "box-location_accepted") {
                        dataObj.filters.push(chbox.id.split("-")[1]);
                    }
                }

            }
            stateKeys.forEach(key => {
                if (key.includes("box") && this.state[key] && !edit) {
                    let splitted = key.split("-");
                    if (!dataObj.filters) {
                        dataObj.filters = [];
                    }
                    dataObj.filters.push(splitted[1]);
                    // location_geo is coordinate input,
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
                    // check all text fields for empty spaces
                    if (!key.includes("box")) {
                        if (this.state[key] !== null) {
                            if (key !== "imgArray" && key !== "oldImgArray") {
                                let tempTextValue = JSON.parse(JSON.stringify(this.state[key]));
                                if (tempTextValue.trim().length !== 0) {
                                    dataObj[key] = this.state[key].trim();
                                } else {
                                    window.alert("Et voi lähettää tyhjiä kenttiä!")
                                    return;

                                }
                            }

                        }


                    }
                }
            })
            // check if form was from edit page or main page
            if (edit) {
                this.handleEditSubmit(dataObj)
            } else {
                if (!dataObj.location_geo) {
                    return;
                }
                dataObj["object_type"] = "city";
                if (!dataObj.location_category) {
                    let newTypes = [...this.props.typeFilters];
                    newTypes.splice(0, 1);
                    dataObj.location_category = newTypes[0].category_id;
                }
                this.submitForm(dataObj, false);

            }



        }
    }
    checkLocationInputValidity = (toCheck) => {
        if (!toCheck) {
            let locItem = document.getElementById("type-ahead-object_location")
            locItem.value = "";
        }
    }




    askForConfirmation = (obj) => {
        askForConfirmation('Haluatko tallentaa tekemäsi muokkaukset?', "Retkipaikan muokkaaminen", () => this.submitForm(obj, true), () => { })
    };
    checkDeleteImgs = (fromState, fromObj) => {
        if (fromState.length === fromObj.length) {
            return [];
        }
        return fromObj.filter(fObj => fromState.filter(fState => fObj === fState.name).length === 0);
    }
    submitForm = (data, edit) => {
        const { editPageObj, postEditData, postFormData, handleClose, removeEditImages, t } = this.props;
        const { imgArray, oldImgArray } = this.state;

        if (edit) {
            const oldImgs = editPageObj.images;
            data["location_id"] = editPageObj.location_id;
            let imagesToDelete = this.checkDeleteImgs(oldImgArray, oldImgs);
            if (imagesToDelete.length > 0) {
                removeEditImages(editPageObj.location_id, imagesToDelete)
            }
            postEditData(data, imgArray);
            handleClose();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            postFormData(data, imgArray, t).then(res => {
                if (res) {
                    handleClose()
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
        if (e.target.id === "location_category") {
            let id = e.target.options[e.target.options.selectedIndex].id;
            value = id;
        }
        this.setState({ [e.target.id]: value });
    }

    generateCheckBoxes = (arr, has) => {
        const { language } = this.props;
        let boxes = arr.map(item => {
            let correctName = getCorrectFilter(item, language)
            if (item.object_type !== "nofilter") {
                return (<CheckBox
                    key={item.filter_id}
                    handleChange={this.handleChange}
                    id={"box-" + item.filter_id}
                    defaultChecked={has.filter((val) => val === item.filter_id).length > 0}
                    text={correctName}
                />)
            } else {
                return null;
            }
        })
        return boxes;
    }
    generateAcceptBox = (obj) => {
        const { t } = this.props;
        return (
            <CheckBox
                key={obj.filter_id}
                handleChange={this.handleChange}
                id={"box-location_accepted"}
                defaultChecked={obj.location_accepted}
                text={t("admin.show_user")}
            />
        )
    }
    static getDerivedStateFromProps(newProps, currentState) {
        // on coordinates props change (map was clicked),
        // change the geo field coordinates
        if (newProps.coords !== currentState.location_geo && newProps.coords !== null) {
            return { location_geo: newProps.coords.lat + "," + newProps.coords.lng };
        } else
            return null;
    }


    getTextForm = (rows, text, helper, description, id, maxLength) => {
        return (
            <div className="form-group">
                <label htmlFor="text-area">{text}</label>
                <textarea maxLength={maxLength} defaultValue={description !== null ? description : ""} onChange={this.handleChange} className="form-control" id={id} rows={rows}></textarea>
                <small id={text + "Help"} className="form-text text-muted">{helper}</small>
            </div>)
    }
    getLocationArr = () => {
        const { regions, municipalities } = this.props;
        return regions.concat(municipalities);
    }
    generateEditForm = () => {
        const { typeFilters, commonFilters, editPageObj, t, language } = this.props;
        let newTypes = [...typeFilters];
        let allArr = this.getLocationArr();
        newTypes.splice(0, 1);
        // generate form for edit page
        return (<form className="needs-validation" noValidate>
            <TextInput maxLength={64} defaultValue={editPageObj.location_name} handleChange={this.handleChange} id="location_name" placeholder={t("form.triplocation_name_ph")} helper={t("form.triplocation_name_desc")} text={t("form.triplocation_name")} required={true} />
            <SelectInput
                language={language}
                id=""
                defaultValue={editPageObj.location_category}
                data={newTypes}
                title={t("form.triplocation_type")}
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
            />
            <small id={"Help"} className="form-text text-muted form-group">{t("form.triplocation_type_desc")}</small>
            <div className="form-row">
                <AutoCompleteInput t={t} data={allArr} applyFilter={this.handleSelection} id="object_location" clearSelection={false} title={t("main.location")} customClassName="form-group col-md-6" helper={t("main.location_desc")} required={true} defaultInputValue={editPageObj.location_municipality ? editPageObj.location_municipality : editPageObj.location_region} />
                <TextInputGeo defaultValue={editPageObj.location_geo.lat + "," + editPageObj.location_geo.lng} handleChange={this.handleChange} id="location_geo" placeholder={t("form.triplocation_coords")} helper={t("form.triplocation_coords_desc")} text={t("form.triplocation_coords")} size="col-md-6" required={true} />
            </div>
            <TextArea rows="3" handleChange={this.handleChange} text={t("form.triplocation_desc")} helper={t("form.triplocation_desc_desc")} defaultValue={editPageObj.location_description} id="location_description" maxLength={512}></TextArea>
            <TextArea rows="3" handleChange={this.handleChange} text={t("form.triplocation_rent")} helper={t("form.triplocation_rent_desc")} defaultValue={editPageObj.location_pricing} id="location_pricing" maxLength={280}></TextArea>
            {this.generateCheckBoxes(commonFilters, editPageObj.filters)}
            <small id={"Help"} className="form-text text-muted form-group">{t("form.triplocation_filter_desc")}</small>
            <div className="form-row">
                <TextInput maxLength={64} defaultValue={editPageObj.location_owner} handleChange={this.handleChange} id="location_owner" placeholder={t("form.triplocation_owner_ph")} helper={t("form.triplocation_owner_desc")} text={t("form.triplocation_owner")} size="col-md-3" required={true} />
                <TextInput maxLength={64} defaultValue={editPageObj.location_website} handleChange={this.handleChange} id="location_website" placeholder="www.retkipaikka.fi" helper={t("form.triplocation_website_desc")} text={t("form.triplocation_website")} size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={editPageObj.location_mail} handleChange={this.handleChange} id="location_mail" placeholder="example@ex.com" helper={t("form.triplocation_email_desc")} text={t("form.triplocation_email")} size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={editPageObj.location_phone} handleChange={this.handleChange} id="location_phone" placeholder="0441235678" helper={t("form.triplocation_phone_desc")} text={t("form.triplocation_phone")} size="col-md-3" required={false} />
            </div>
            {this.generateAcceptBox(editPageObj)}
            <button onClick={(e) => this.handleFormSubmit(e, true)} type="submit" className="btn btn-primary">{t("admin.save")}</button>
        </form>)
        // data: { name: null, website:
    }

    handleSelection = (e) => {
        if (e.municipality_id) {
            this.setState({ location_municipality: "" + e.municipality_id, location_region: "" + e.region_id })
        } else {
            this.setState({ location_municipality: null, location_region: "" + e.region_id })
        }

    }
    applyImage = (img, oldImgs) => {
        this.setState({ imgArray: img, oldImgArray: oldImgs });
    }
    generateLocationForm = () => {
        const { typeFilters, commonFilters, t, language } = this.props;
        let newTypes = [...typeFilters];
        let allArr = this.getLocationArr();
        newTypes.splice(0, 1);
        // generate from for main page
        return (<form className="needs-validation" noValidate>
            <TextInput maxLength={64} handleChange={this.handleChange} id="location_name" placeholder={t("form.triplocation_name_ph")} helper={t("form.triplocation_name_desc")} text={t("form.triplocation_name")} required={true} />
            <SelectInput
                id=""
                data={newTypes}
                title={t("form.triplocation_type")}
                useFiltering={false}
                handleFormSelect={this.handleChange}
                customClassName={"form-select-input"}
                language={language}
            />
            <small id={"Help"} className="form-text text-muted form-group">{t("form.triplocation_type_desc")}</small>
            <div className="form-row">
                {/* <TextInput data={allArr} applyFilter={this.addFilter} title="Paikannimi" customClassName="inputform-select form-group col-md-4 col-sm-11 " /> */}
                <AutoCompleteInput t={t} data={allArr} applyFilter={this.handleSelection} id="object_location" clearSelection={false} title={t("main.location")} customClassName="form-group col-md-6" helper={t("main.location_desc")} required={true} />
                {/* <TextInput handleChange={this.handleChange} id="object_name" placeholder="Paikan sijainti" helper="Kirjoita retkipaikan sijainti" text="Sijainti*" size="col-md-6" required={true} /> */}
                <TextInputGeo handleChange={this.handleChange} id="location_geo" placeholder={t("form.triplocation_coords")} helper={t("form.triplocation_coords_desc")} text={t("form.triplocation_coords")} size="col-md-6" required={true} />
            </div>
            <TextArea rows="3" handleChange={this.handleChange} text={t("form.triplocation_desc")} helper={t("form.triplocation_desc_desc")} defaultValue={null} id="location_description" maxLength={512}></TextArea>
            <TextArea rows="3" handleChange={this.handleChange} text={t("form.triplocation_rent")} helper={t("form.triplocation_rent_desc")} defaultValue={null} id="location_pricing" maxLength={280}></TextArea>

            {this.generateCheckBoxes(commonFilters, [])}
            <small id={"Help"} className="form-text text-muted form-group">{t("form.triplocation_filter_desc")}</small>
            <div className="form-row">
                <TextInput maxLength={64} handleChange={this.handleChange} id="location_owner" placeholder={t("form.triplocation_owner_ph")} helper={t("form.triplocation_owner_desc")} text={t("form.triplocation_owner")} size="col-md-3" required={true} />
                <TextInput maxLength={64} handleChange={this.handleChange} id="location_website" placeholder="www.retkipaikka.fi" helper={t("form.triplocation_website_desc")} text={t("form.triplocation_website")} size="col-md-3" required={false} />
                <TextInput maxLength={64} handleChange={this.handleChange} id="location_mail" placeholder="example@ex.com" helper={t("form.triplocation_email_desc")} text={t("form.triplocation_email")} size="col-md-3" required={false} />
                <TextInput maxLength={64} handleChange={this.handleChange} id="location_phone" placeholder="0441235678" helper={t("form.triplocation_phone_desc")} text={t("form.triplocation_phone")} size="col-md-3" required={false} />
            </div>
            <button onClick={(e) => this.handleFormSubmit(e, false)} type="submit" className="btn btn-primary">{t("form.triplocation_send")}</button>
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
                {form}
                <FormImageUpload applyImage={this.applyImage} imagesFromLocation={editPageObj} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        coords: state.map.coords,
        typeFilters: state.filters.locationTypeFilterList,
        commonFilters: state.filters.commonFilterList,
        regions: state.filters.regions,
        municipalities: state.filters.municipalities,
        language: state.general.language
    }
}
export default connect(mapStateToProps, { removeFilter, postEditData, postFormData, removeEditImages })(LocationForm);

