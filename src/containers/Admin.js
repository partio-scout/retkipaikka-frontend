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




const Admin = (props) => {
    const { t } = props;
    const [element, setElement] = useState("locations")
    const dispatch = useDispatch()
    const { currentUsers, newUsers, allRoles } = useUserData();


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
        fetchSingleUser();
    }, [])

    const handleMenuClick = (e) => {
        let type = e.target.id;
        if (type) {
            setElement(type)
        }
    }

    const getAdminPanel = () => {
        let renderElement = "";
        switch (element) {
            case "locations":
            case "notifications":
                renderElement = <LocationList t={t} type={element} />
                break;
            case "filters":
                renderElement = <FilterHandler t={t} />
                break;
            case "settings":
                renderElement = <AdminSettings t={t} currentUsers={currentUsers} newUsers={newUsers} allRoles={allRoles} />
                break;
            default:
                renderElement = <h3>Testi</h3>
                break;
        }


        return (
            <div>
                <AdminPanel t={t} selectedTab={element} handleClick={handleMenuClick} />
                <div className="admin-data-container">
                    {renderElement}
                </div>

                {/* <iframe width="100%" height="800" src="http://localhost:3000/" frameborder="0" allowfullscreen></iframe> */}
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