import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import { getCorrectFilter } from "../../actions/FilterActions"
import InfoDialog from "./InfoDialog";
import InputContainer from "../inputform/InputContainer"
import AdminTable from "../../helpers/AdminTable"
class LocationList extends React.Component {
    state = {
        clickedObj: null,
        clickPos: null
    }
    getText = () => {
        return "<-";
    }
    handleRemove = () => {

    }
    handleEdit = () => {

    }

    handleObjectClick = (obj, e) => {
        //set clickedobject and move window down by 50px and right by 50px from clicked position
        this.setState({ clickedObj: obj, clickPos: { height: e.clientY + 50, width: e.clientX + 50 } });

    }
    handleClose = () => {
        this.setState({ clickedObj: null });
    }

    getRowData = (obj, i) => {
        return (
            <tr key={obj.id} onClick={(e) => this.handleObjectClick(obj, e)}>
                <th scope="row">{obj.location_id}</th>
                <td>{obj.location_name}</td>
                <td>{obj.location_municipality ? obj.location_municipality : "-"}</td>
                <td>{obj.location_region}</td>
                <td>{this.getCorrectName(obj.location_category, "category")}</td>
                <td>{obj.location_owner}</td>
            </tr>
        )

    }

    getCorrectName = (id, type) => {
        const { commonFilters, locationTypes, language } = this.props;
        let loopArr = type === "filter" ? commonFilters : locationTypes;
        for (let i = 0; i < loopArr.length; ++i) {
            let filter = loopArr[i];
            if (filter[type + "_id"] === id) {
                return getCorrectFilter(filter, language)
            }

        }

    }

    checkType = (type) => {
        return type === "locations"
    }

    getObjEntries = () => {
        return [
            { id: "location_id", t: "#" },
            { id: "location_name", t: "admin.name" },
            { id: "location_municipality", t: "admin.municipality" },
            { id: "location_region", t: "admin.region" },
            { id: "location_category", t: "admin.type" },
            { id: "location_owner", t: "admin.owner" },
        ]
    }
    render() {
        const { clickedObj, clickPos } = this.state;
        const { type, t, results, notifications } = this.props;
        // this same component is used in admin notification and admin location list page
        let isLocation = this.checkType(type);
        let title = isLocation ? t("admin.current") : t("admin.unaccepted")
        return (
            <div className="admin-content-container">
                <h3>{title}</h3>
                {isLocation && <InputContainer t={t} adminPage={true} />}
                <div className="location-list-container">
                    <AdminTable
                        getRowData={this.getRowData}
                        data={isLocation ? results : notifications}
                        objEntries={this.getObjEntries()}
                        t={t}
                    />
                </div>

                {clickedObj !== null && <InfoDialog t={t} data={clickedObj} locationPage={true} clickHeight={clickPos} handleClose={this.handleClose}></InfoDialog>}


            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        notifications: state.searchResults.notificationResults,
        language: state.general.language,
        locationTypes: state.filters.locationTypeFilterList,
        commonFilters: state.filters.commonFilterList

    }
}
export default connect(mapStateToProps)(LocationList);

