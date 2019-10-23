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

        const values = results.map(location => {
            return <ListComponent data={location} />
        })

        return values;
    }


    render() {
        //const items = this.generateListItems();
        return (
            <div>
                <h3>Ilmoitetut retkipaikat</h3>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.searchResults,

    }
}
export default connect(mapStateToProps)(LocationList);

