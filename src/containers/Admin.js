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




const Admin = (props) => {
    const { t } = props;
    const [element, setElement] = useState("locations")
    const dispatch = useDispatch()
    useAdminContext();
    const tabs = ["notifications", "locations", "filters", "notificationEditor", "settings"]

    const handleInitialFetch = () => {
        batch(() => {
            dispatch(fetchLocations(true));
            dispatch(fetchLocations(false));
            dispatch(fetchFilters());
            dispatch(fetchRegionsAndMunicipalities());
        })

    }

    useEffect(() => {
        handleInitialFetch();
    }, [])

    const handleMenuClick = (e) => {
        let type = e.target.id;
        if (type) {
            setElement(type)
        }
    }

    const getAdminPanel = () => {
        let renderElement = "";
        console.log(element)
        switch (element) {
            case "locations":
            case "notifications":
                renderElement = <LocationList t={t} type={element} />
                break;
            case "filters":
                renderElement = <FilterHandler t={t} />
                break;
            case "settings":
                renderElement = <AdminSettings t={t} />
                break;
            case "notificationEditor":
                renderElement = <NotificationEditor t={t} />
                break;
            default:
                renderElement = <h3>Testi</h3>
                break;
        }


        return (

            <div className="admin-container">
                <div className="admin-panel">
                    <div className="list-group admin-list" >
                        {tabs.map((tab, i) => {
                            return (
                                <span key={i} onClick={handleMenuClick} id={tab} className={"list-group-item list-group-item-action " + (element === tab ? "tab-selected" : "")} >
                                    {t("admin." + tab)}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className="admin-data-container">
                    {renderElement}
                </div>

            </div>


        )
    }

    console.log("ADMIN RENDER")
    return (
        <div className="frontpage-container">
            {getAdminPanel()}
        </div>

    )
}

export default Admin;