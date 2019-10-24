import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import ListComponent from "./ListComponent";
class LocationList extends React.Component {

    getText = () => {
        return "<-";
    }
    handleRemove = () => {

    }
    handleEdit = () => {

    }



    getRowData = (obj, index) => {
        return (
            <tr>
                <th scope="row">{index}</th>
                <td>{obj.name}</td>
                <td>{obj.text}</td>
                <td>{obj.propertyType}</td>
            </tr>
        )

    }
    generateListItems = () => {
        const { results } = this.props;
        const values = results.map((location, i) => {
            return this.getRowData(location, i + 1)

        })
        let head = (<thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nimi</th>
                <th scope="col">Sijainti</th>
                <th scope="col">Tyyppi</th>
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
        const items = this.generateListItems();
        return (
            <div className="admin-content-container">
                <h3>Retkipaikat</h3>
                <div className="location-list-container">
                    {items}
                </div>
            </div>

        )
    }
}



const mapStateToProps = state => {
    return {
        results: state.searchResults.searchResults,

    }
}
export default connect(mapStateToProps)(LocationList);

