import React from "react";
import "./admin.css"
const AdminPanel = ({ handleClick, selectedTab, t }) => {

    const tabs = ["notifications", "locations", "filters", "settings"]
    return (
        <div className="admin-panel">
            <div className="list-group admin-list" >
                {tabs.map((tab, i) => {
                    return (
                        <span key={i} onClick={handleClick} id={tab} className={"list-group-item list-group-item-action " + (selectedTab === tab ? "tab-selected" : "")} >
                            {t("admin." + tab)}
                        </span>
                    )
                })}
            </div>

        </div>


    )

}

export default AdminPanel;