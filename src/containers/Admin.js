import React, { useEffect, useState } from "react";

import "./styles/main.css";
import Header from "../components/header/Header"
import TextInput from "../components/locationform/textInput";
import AdminPanel from "../components/admin/AdminPanel"
import AdminSettings from "../components/admin/AdminSettings"
import LocationList from "../components/admin/LocationList"
import FilterHandler from "../components/admin/FilterHandler";
import { fetchLocations } from "../actions/SearchResultsActions"
import { useUserData } from "../helpers/UserHelper";
import { fetchFilters, fetchRegionsAndMunicipalities } from "../actions/FilterActions"
import { useSelector, useDispatch, batch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";



const Admin = (props) => {
    const { t } = props;
    const [element, setElement] = useState("locations")
    const dispatch = useDispatch()
    const { currentUsers, newUsers } = useUserData();

    const { results, filtersLoc, filtersCom, regions, municipalities } = useSelector(state => {
        const results = state.searchResults
        const filtersLoc = state.filters.locationTypeFilterList
        const filtersCom = state.filters.commonFilterList
        const regions = state.filters.regions
        const municipalities = state.filters.municipalities
        return { results, filtersLoc, filtersCom, regions, municipalities }
    })


    const handleInitialFetch = () => {
        batch(() => {
            if (results.searchResults.length === 0) {
                dispatch(fetchLocations(true));
                dispatch(fetchLocations(false));
            }
            if (filtersLoc.length === 0 || filtersCom.length === 0) {
                dispatch(fetchFilters());
            }
            if (regions.length === 0 || municipalities.length === 0) {
                dispatch(fetchRegionsAndMunicipalities());
            }
        })

        //const { fetchLocations, fetchFilters, fetchRegionsAndMunicipalities, results, filtersLoc, filtersCom, regions, municipalities } = this.props;


    }

    useEffect(() => {
        handleInitialFetch()
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
                renderElement = <AdminSettings t={t} currentUsers={currentUsers} newUsers={newUsers} />
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