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

    generateListItems = () => {
        const { results } = this.props;
        console.log(results);
        const values = results.map(location => {
            return <ListComponent data={location} />
        })

        return values;
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

