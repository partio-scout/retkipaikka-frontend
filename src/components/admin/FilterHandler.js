import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import TextInput from "../locationform/textInput"

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
class FilterHandler extends React.Component {
    state = {

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
            switch (value) {
                case "filter":
                    this.askForConfirmation("suodattimen " + data, "Suodattimen lisääminen")
                    break;
                case "types":
                    this.askForConfirmation("kategorian " + data, "Kategorian lisääminen")
                    break;
            }

        }
    }
    getRowData = (obj, dataId) => {
        return (
            <tr key={obj[dataId + "id"]}>
                <th scope="row">{obj[dataId + "id"]}</th>
                <td>{obj.object_name}</td>
            </tr>
        )

    }
    askForConfirmation = (name, title) => {
        confirmAlert({
            title: title,
            message: 'Haluatko tallentaa ' + name + '?',
            buttons: [
                {
                    label: 'Kyllä',
                    onClick: () => alert("add")
                },
                {
                    label: 'Ei',

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


    render() {
        //const items = this.generateListItems();
        const { locationTypes, commonFilters } = this.props;
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
export default connect(mapStateToProps)(FilterHandler);

