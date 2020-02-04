import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import TextInput from "../locationform/textInput"
import { postFilter, postCategory, deleteCategory, deleteFilter } from "../../actions/FilterActions"
import { confirmAlert } from 'react-confirm-alert';
import InfoDialog from "./InfoDialog"
import 'react-confirm-alert/src/react-confirm-alert.css';
class FilterHandler extends React.Component {
    state = {
        clickedObj: null
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
                    obj = this.generateObj(value);
                    this.askForConfirmation("suodattimen " + data, "Suodattimen lisääminen", obj)


                    break;
                case "locationtype":
                    obj = this.generateObj(value);
                    this.askForConfirmation("kategorian " + data, "Kategorian lisääminen", obj)
                    break;
                default:
                    break;
            }

        }
    }
    getRowData = (obj, dataId) => {
        return (
            <tr key={obj[dataId + "id"]} onClick={(e) => this.handleObjectClick(obj, e)}>
                <th scope="row">{obj[dataId + "id"]}</th>
                <td>{obj.object_name}</td>
                <td>{obj.object_name_sv ? obj.object_name_sv : "-"}</td>
                <td>{obj.object_name_sa ? obj.object_name_sa : "-"}</td>
                <td>{obj.object_name_en ? obj.object_name_en : "-"}</td>

            </tr>
        )

    }

    handleObjectClick = (obj, e) => {
        //set clickedobject and move window down by 50px and right by 50px from clicked position
        this.setState({ clickedObj: obj, clickPos: { height: e.clientY + 50, width: e.clientX + 50 } });

    }

    closeFunc = () => {
        return false
    }
    handlePost = (obj) => {
        const { postFilter, postCategory } = this.props;
        console.log(obj);
        if (obj.object_type === "filter") {
            postFilter(obj);
        } else {
            postCategory(obj);
        }
        let fields = document.getElementsByClassName("form-control");
        for (let i = 0; i < fields.length; ++i) {
            fields[i].value = ""
        }

    }
    askForConfirmation = (name, title, obj) => {
        confirmAlert({
            title: title,
            message: 'Haluatko tallentaa ' + name + '?',
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => this.handlePost(obj)
                },
                {
                    label: 'Ei',
                    onClick: () => this.closeFunc()

                }
            ]
        });
    };

    handleDelete = (obj) => {
        const { deleteFilter, deleteCategory } = this.props;
        console.log(obj);
        if (obj.object_type === "filter") {
            deleteFilter(obj);
        } else {
            deleteCategory(obj);
        }
        this.handleClose()

    }
    askForDelConfirmation = (name, title, obj) => {
        confirmAlert({
            title: title + " poistaminen",
            message: 'Haluatko poistaa ' + name + '?',
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => this.handleDelete(obj)
                },
                {
                    label: 'Ei',
                    onClick: () => this.closeFunc()

                }
            ]
        });
    };


    getTable = (data, dataId) => {
        let values = [...data].splice(1, data.length - 1).map(d => this.getRowData(d, dataId));


        // values = values.map(d => this.getRowData(d));
        let head = (<thead>
            <tr>
                <th id={dataId + "id"} scope="col">#</th>
                <th id="object_name" scope="col">Nimi</th>
                <th id="object_name_sv" scope="col">SV</th>
                <th id="object_name_sa" scope="col">SMN</th>
                <th id="object_name_en" scope="col">EN</th>
            </tr>
        </thead>)

        let body = (<tbody>
            {values}
        </tbody>)

        return (<table className="table table-hover">
            {head}
            {body}
        </table>)
    }
    handleClose = () => {
        this.setState({ clickedObj: null })
    }

    render() {
        //const items = this.generateListItems();
        const { locationTypes, commonFilters } = this.props;
        const { clickedObj, clickPos } = this.state;
        return (
            <div className="admin-content-container">
                <h3>Suodattimet ja kategoriat</h3>
                <h5>Suodattimet</h5>
                {this.getTable(commonFilters, "filter_")}

                <form onSubmit={(e) => this.handleSubmit(e, "filter")}>
                    <div className="form-row">
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter" placeholder="Suomeksi" helper="Kirjoita lisättävän suodattimen nimi*" text="Suodatin" size="col-md-3" required={true} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_sv" placeholder="Ruotsiksi" helper="Kirjoita lisättävän suodattimen nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_sa" placeholder="Saameksi" helper="Kirjoita lisättävän suodattimen nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="filter_en" placeholder="Englanniksi" helper="Kirjoita lisättävän suodattimen nimi*" text="-" size="col-md-3" required={false} />
                        <button className="btn btn-primary admin-filter-button">Lisää</button>
                    </div>
                </form>
                <h5>Kategoriat</h5>
                {this.getTable(locationTypes, "category_")}
                <form onSubmit={(e) => this.handleSubmit(e, "locationtype")}>
                    <div className="form-row">
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype" placeholder="Suomeksi" helper="Kirjoita lisättävän kategorian nimi*" text="Kategoria" size="col-md-3" required={true} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_sv" placeholder="Ruotsiksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_sa" placeholder="Saameksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <TextInput maxLength={64} handleChange={this.handleChange} id="locationtype_en" placeholder="Englanniksi" helper="Kirjoita lisättävän kategorian nimi" text="-" size="col-md-3" required={false} />
                        <button className="btn btn-primary admin-filter-button">Lisää</button>
                    </div>
                </form>
                {clickedObj !== null && <InfoDialog data={clickedObj} handleDelete={this.askForDelConfirmation} clickHeight={clickPos} handleClose={this.handleClose}></InfoDialog>}



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

