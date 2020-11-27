import React, { useEffect, useState } from "react";

import "./styles/main.css";
import Header from "../components/header/Header"
import TextInput from "../components/shared/TextInput";
import AdminPanel from "../components/admin/AdminPanel"
import AdminSettings from "../components/admin/AdminSettings"
import LocationList from "../components/admin/LocationList"
import FilterHandler from "../components/admin/FilterHandler";
import { fetchLocations } from "../actions/SearchResultsActions"
import { useUserData, fetchSingleUser } from "../helpers/UserHelper";
import { fetchFilters, fetchRegionsAndMunicipalities } from "../actions/FilterActions"
import { useDispatch, batch } from "react-redux";
import { useAdminContext } from "../context/AdminContext"
import NotificationEditor from "../components/admin/NotificationEditor"
import { render } from "react-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";




const Admin = (props) => {
    const { children } = props;
    const [element, setElement] = useState("locations")
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation()
    useAdminContext();
    const tabs = [{ t: "notifications", path: "uudet" }, { t: "locations", path: "selaa" }, { t: "filters", path: "suodattimet" }, { t: "settings", path: "asetukset" }, { t: "notificationEditor", path: "ilmoitukset" }]




    const getAdminPanel = () => {
        return (
            <div className="admin-container">
                <div className="admin-panel">
                    <div className="list-group admin-list" >
                        {tabs.map((tab, i) => {
                            return (
                                <span key={i} onClick={() => history.push("/hallinta/" + tab.path)} id={tab.t} className={"list-group-item list-group-item-action " + (location.pathname === "/hallinta/" + tab.path ? "tab-selected" : "")} >
                                    {t("admin." + tab.t)}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="admin-data-container">
                    {children}
                </div>

            </div>


        )
    }

    return (
        <div className="frontpage-container">
            {getAdminPanel()}
        </div>

    )
}

export default Admin;