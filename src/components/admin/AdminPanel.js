import React from "react";
import "./admin.css"
class AdminPanel extends React.Component {



    render() {
        const { handleClick, selectedTab } = this.props;

        return (
            <div className="admin-panel">
                <div className="list-group admin-list" >
                    <span onClick={handleClick} id="notifications" className={"list-group-item list-group-item-action " + (selectedTab === "notifications" ? "tab-selected" : "")} >
                        Katso ilmoituksia
                    </span>
                    <span onClick={handleClick} id="locations" className={"list-group-item list-group-item-action " + (selectedTab === "locations" ? "tab-selected" : "")} >Selaa retkipaikkoja</span>
                    <span onClick={handleClick} id="filters" className={"list-group-item list-group-item-action " + (selectedTab === "filters" ? "tab-selected" : "")} >Suodattimet</span>
                </div>

            </div>


        )
    }
}

export default AdminPanel;