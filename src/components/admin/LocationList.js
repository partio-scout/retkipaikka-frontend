import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import { getCorrectFilter } from "../../actions/FilterActions"
import { fetchLocations } from "../../actions/SearchResultsActions"
import DraggableDialog from "./dialogs/DraggableDialog";
import InputContainer from "../inputform/InputContainer"
import AdminTable from "../shared/AdminTable"
import LocationEditDialog from "./dialogs/LocationEditDialog"
import InfoDialog from "./dialogs/InfoDialog"
import AmountSelect from "../map/AmountSelect"
class LocationList extends React.Component {
    state = {
        clickedObj: null,
        clickPos: null,
        locationCount: 100
    }
    getText = () => {
        return "<-";
    }
    handleRemove = () => {

    }
    handleEdit = () => {

    }

    handleObjectClick = (obj, e) => {
        const { fetchLocations } = this.props;
        //set clickedobject and move window down by 50px and right by 50px from clicked position
        if (obj.filters == null || obj.location_accepted == null) {
            fetchLocations(true);
            fetchLocations(false);
            //window.alert("Kokeile ladata sivu uudelleen, virhe retkipaikkojen tietojen latauksessa")
        } else {
            this.setState({ clickedObj: obj });
        }

    }
    handleClose = () => {
        this.setState({ clickedObj: null });
    }

    getRowData = (obj) => {
        return (
            <tr key={obj.location_id} onClick={(e) => this.handleObjectClick(obj, e)}>
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
        const { clickedObj, clickPos, locationCount } = this.state;
        const { type, t, results, notifications } = this.props;
        // this same component is used in admin notification and admin location list page
        let isLocation = this.checkType(type);
        let title = isLocation ? t("admin.current") : t("admin.unaccepted")
        let splittedRes = isLocation ? results : notifications;
        if (locationCount !== "all") {
            splittedRes = results.slice(0, parseInt(locationCount))
            if (isLocation) {
                splittedRes = results.slice(0, parseInt(locationCount))
            } else {
                splittedRes = notifications.slice(0, parseInt(locationCount))
            }

        }
        return (
            <div className="admin-content-container">
                <div className={"location-title-select"}>
                    <h3>{title}</h3>
                    <AmountSelect defaultVal={100} customClassName={"admin-location-count"} changeLocationCount={(val) => this.setState({ locationCount: val })} t={t} />
                </div>

                {isLocation && <InputContainer limitedFields={false} t={t} adminPage={true} />}

                <div className="location-list-container">
                    <AdminTable
                        getRowData={this.getRowData}
                        data={splittedRes}
                        objEntries={this.getObjEntries()}
                        t={t}
                    />
                </div>
                {clickedObj !== null &&
                    <InfoDialog handleClose={this.handleClose} open={clickedObj !== null} dialogTitle={t("admin.triplocation_info")}>
                        <LocationEditDialog
                            t={t}
                            data={clickedObj}
                            handleClose={this.handleClose}
                        />
                    </InfoDialog>
                }


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
export default connect(mapStateToProps, { fetchLocations })(LocationList);

