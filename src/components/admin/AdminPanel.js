import React from "react";
import "./admin.css"
const AdminPanel = ({ handleClick, selectedTab, t }) => {

    return (
        <div className="admin-panel">
            <div className="list-group admin-list" >
                <span onClick={handleClick} id="notifications" className={"list-group-item list-group-item-action " + (selectedTab === "notifications" ? "tab-selected" : "")} >
                    {t("admin.notifications")}
                </span>
                <span onClick={handleClick} id="locations" className={"list-group-item list-group-item-action " + (selectedTab === "locations" ? "tab-selected" : "")} >{t("admin.triplocations")}</span>
                <span onClick={handleClick} id="filters" className={"list-group-item list-group-item-action " + (selectedTab === "filters" ? "tab-selected" : "")} >{t("admin.filters")}</span>
                <span onClick={handleClick} id="settings" className={"list-group-item list-group-item-action " + (selectedTab === "settings" ? "tab-selected" : "")} >{t("admin.settings")}</span>
            </div>

        </div>


    )

}

export default AdminPanel;