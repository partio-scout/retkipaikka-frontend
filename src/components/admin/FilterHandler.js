import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import TextInput from "../locationform/textInput"
import ListComponent from "./ListComponent";
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

    generateListItems = () => {
        const { results } = this.props;

        const values = results.map(location => {
            return <ListComponent data={location} />
        })

        return values;
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
    getRowData = (obj) => {
        return (
            <tr key={obj.id}>
                <th scope="row">{obj.id}</th>
                <td>{obj.text}</td>
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


    getTable = (data) => {
        let values = [...data].splice(1, data.length - 1).map(d => this.getRowData(d));


        // values = values.map(d => this.getRowData(d));
        let head = (<thead>
            <tr>
                <th id="id" scope="col">#</th>
                <th id="name" scope="col">Nimi</th>
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
                {this.getTable(commonFilters)}

                <form onSubmit={(e) => this.handleSubmit(e, "filter")}>
                    <div className="form-row">
                        <TextInput handleChange={this.handleChange} id="filter" placeholder="suodatin" helper="Kirjoita lisättävän suodattimen nimi" text="Lisää suodatin" size="col-md-3" required={true} />
                        <button className="btn btn-primary admin-filter-button">Lisää</button>
                    </div>
                </form>
                <h5>Kategoriat</h5>
                {this.getTable(locationTypes)}
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

