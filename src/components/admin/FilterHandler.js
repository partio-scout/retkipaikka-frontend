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
    handleSubmit = (e, value) => {
        e.preventDefault();
        let data = this.state[value];
        if (data) {
            let obj = { object_type: "filter", object_name: data };
            switch (value) {
                case "filter":

                    this.askForConfirmation("suodattimen " + data, "Suodattimen lisääminen", obj)


                    break;
                case "types":
                    obj.object_type = "locationtype"
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
            title: title,
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
                        <TextInput handleChange={this.handleChange} id="filter" placeholder="suodatin" helper="Kirjoita lisättävän suodattimen nimi" text="Lisää suodatin" size="col-md-3" required={true} />
                        <button className="btn btn-primary admin-filter-button">Lisää</button>
                    </div>
                </form>
                <h5>Kategoriat</h5>
                {this.getTable(locationTypes, "category_")}
                <form onSubmit={(e) => this.handleSubmit(e, "types")}>
                    <div className="form-row">
                        <TextInput handleChange={this.handleChange} id="types" placeholder="Kategoria" helper="Kirjoita lisättävän kategorian nimi" text="Lisää kategoria" size="col-md-3" required={true} />
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

