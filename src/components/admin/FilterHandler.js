import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import TextInput from "../shared/TextInput"
import { postFilter, postCategory, deleteCategory, deleteFilter } from "../../actions/FilterActions"
import InfoDialog from "./dialogs/InfoDialog"
import { askForConfirmation, clearFormByClassName } from "../../helpers/Helpers"
import { checkRoleValidity } from "../../helpers/UserHelper"
import AdminTable from "../shared/AdminTable"
import FilterEditDialog from "./dialogs/FilterEditDialog"
class FilterHandler extends React.Component {
    state = {
        clickedObj: null,
        isSuper: true
    }
    getText = () => {
        return "<-";
    }
    handleRemove = () => {

    }
    handleEdit = () => {

    }


    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.id]: value });

    }
    generateObj = (type) => {
        let langArr = ["en", "sv", "sa"]
        let obj = { object_type: type }
        obj.object_name = this.state[type];
        langArr.forEach(l => {
            let stateVal = this.state[type + "_" + l]
            obj["object_name_" + l] = stateVal ? stateVal : null;
        })
        return obj;
    }
    handleSubmit = (e, value) => {
        e.preventDefault();
        let data = this.state[value];
        if (data) {
            let obj = {}
            switch (value) {
                case "filter":
                    obj = this.generateObj(value)
                    askForConfirmation("Haluatko tallentaa suodattimen " + data, "Suodattimen lisääminen", () => this.handlePost(obj), this.closeFunc)
                    break;
                case "locationtype":
                    obj = this.generateObj(value);
                    askForConfirmation("Haluatko tallentaa kategorian " + data, "Kategorian lisääminen", () => this.handlePost(obj), this.closeFunc)
                    break;
                default:
                    break;
            }

        }
    }

    componentDidMount() {
        const isSuper = checkRoleValidity();
        this.setState({ isSuper })
    }
    commonFilterRows = (obj) => {
        return (
            <tr key={obj["filter_id"]} onClick={(e) => this.handleObjectClick(obj, e)}>
                <th scope="row">{obj["filter_id"]}</th>
                <td>{obj.object_name}</td>
                <td>{obj.object_name_sv ? obj.object_name_sv : "-"}</td>
                <td>{obj.object_name_sa ? obj.object_name_sa : "-"}</td>
                <td>{obj.object_name_en ? obj.object_name_en : "-"}</td>

            </tr>
        )
    }
    categoryRows = (obj) => {
        return (
            <tr key={obj["category_id"]} onClick={(e) => this.handleObjectClick(obj, e)}>
                <th scope="row">{obj["category_id"]}</th>
                <td>{obj.object_name}</td>
                <td>{obj.object_name_sv ? obj.object_name_sv : "-"}</td>
                <td>{obj.object_name_sa ? obj.object_name_sa : "-"}</td>
                <td>{obj.object_name_en ? obj.object_name_en : "-"}</td>

            </tr>
        )

    }

    handleObjectClick = (obj, e) => {
        const { isSuper } = this.state;
        //set clickedobject and move window down by 50px and right by 50px from clicked position
        if (isSuper) {
            this.setState({ clickedObj: obj });
        }


    }

    closeFunc = () => {
        return false
    }
    handlePost = (obj) => {
        const { postFilter, postCategory } = this.props;
        if (obj.object_type === "filter") {
            postFilter(obj);
        } else {
            postCategory(obj);
        }
        clearFormByClassName("form-control")

    }


    handleClose = () => {
        this.setState({ clickedObj: null })
    }
    filterEntries = (type) => {
        return [
            { id: type, t: "#" },
            { id: "object_name", t: "admin.name" },
            { id: "object_name_sv", t: "SV" },
            { id: "object_name_sa", t: "SMN" },
            { id: "object_name_en", t: "EN" },
        ]
    }
    getFilterForm() {
        const { t } = this.props;
        const { isSuper } = this.state;
        if (isSuper) {
            return (
                <form onSubmit={(e) => this.handleSubmit(e, "filter")}>
                    <div className="form-row">
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter" placeholder="Suomeksi" helper="Kirjoita lisättävän suodattimen nimi*" text="Suodatin" size="col-md-3" required={true} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_sv" placeholder="Ruotsiksi" helper="Kirjoita lisättävän suodattimen nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_sa" placeholder="Saameksi" helper="Kirjoita lisättävän suodattimen nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_en" placeholder="Englanniksi" helper="Kirjoita lisättävän suodattimen nimi*" text="-" size="col-md-3" required={false} />
                        <button className="btn btn-primary admin-filter-button">{t("admin.add")}</button>
                    </div>
                </form>
            )
        }


    }
    getCategoryForm() {
        const { t } = this.props;
        const { isSuper } = this.state;
        if (isSuper) {
            return (
                <form onSubmit={(e) => this.handleSubmit(e, "locationtype")}>
                    <div className="form-row">
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype" placeholder="Suomeksi" helper="Kirjoita lisättävän kategorian nimi*" text="Kategoria" size="col-md-3" required={true} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_sv" placeholder="Ruotsiksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_sa" placeholder="Saameksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_en" placeholder="Englanniksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <button className="btn btn-primary admin-filter-button">{t("admin.add")}</button>
                    </div>
                </form>
            )
        }
    }

    render() {
        //const items = this.generateListItems();
        const { locationTypes, commonFilters, t } = this.props;
        const { clickedObj } = this.state;
        return (
            <div className="admin-content-container">
                <h3>{t("admin.filters_title")}</h3>
                <h5>{t("admin.filters")}</h5>
                <AdminTable
                    getRowData={this.commonFilterRows}
                    data={[...commonFilters].splice(1, commonFilters.length - 1)}
                    objEntries={this.filterEntries("filter_id")}
                    t={t}
                />
                {this.getFilterForm()}
                <h5>{t("admin.categories")}</h5>
                <AdminTable
                    getRowData={this.categoryRows}
                    data={[...locationTypes].splice(1, locationTypes.length - 1)}
                    objEntries={this.filterEntries("category_id")}
                    t={t}
                />
                {this.getCategoryForm()}
                {clickedObj !== null &&
                    <InfoDialog open={clickedObj !== null} dialogTitle={t("admin.filter_category_edit")} handleClose={this.handleClose}>
                        <FilterEditDialog
                            t={t}
                            handleClose={this.handleClose}
                            data={clickedObj}
                        />

                    </InfoDialog>
                }



            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        locationTypes: state.filters.locationTypeFilterList,
        commonFilters: state.filters.commonFilterList

    }
}
export default connect(mapStateToProps, { postFilter, postCategory, deleteCategory, deleteFilter })(FilterHandler);

