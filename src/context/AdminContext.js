import React, { createContext, useState, useEffect, useContext } from 'react';
import Admin from '../containers/Admin';
import { useUserData, useLoginData } from "../helpers/UserHelper"
import { fetchLocations } from "../actions/SearchResultsActions"
import { fetchFilters, fetchRegionsAndMunicipalities } from "../actions/FilterActions"
import { getUser } from "../helpers/UserHelper"
import { useDispatch, batch } from "react-redux";
import { useLoading } from "../helpers/Helpers"
const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const { loading, loggedIn, changeLoginStatus } = useLoginData()
    const { currentUsers, newUsers, allRoles, fetchData } = useUserData();
    const [notifications, setNotifications] = useState([])
    const { spinner, setLoading } = useLoading(false);
    const [fetched, setFetched] = useState(false)
    const dispatch = useDispatch()




    const handleInitialFetch = () => {
        batch(() => {
            dispatch(fetchLocations(true));
            dispatch(fetchLocations(false));
            dispatch(fetchFilters());
            dispatch(fetchRegionsAndMunicipalities());
        })
        setFetched(true)


    }

    const store = {
        currentUsers,
        newUsers,
        allRoles,
        fetchData,
        loading,
        loggedIn,
        changeLoginStatus,
        handleInitialFetch,
        fetched,
        notifications,
        setNotifications,
        spinner,
        setLoading
    };


    return <AdminContext.Provider value={store}>{children}</AdminContext.Provider>
}

const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdminContext must be used in AdminContextProvider');
    } else {
        return context;
    }
}
export { AdminContext, AdminContextProvider, useAdminContext };