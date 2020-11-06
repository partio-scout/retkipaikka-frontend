import React, { createContext, useState, useContext } from 'react';
import Admin from '../containers/Admin';
import { useUserData, useLoginData } from "../helpers/UserHelper"
import { getUser } from "../helpers/UserHelper"

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const { loading, loggedIn, changeLoginStatus } = useLoginData()
    const { currentUsers, newUsers, allRoles, fetchData } = useUserData();
    const store = {
        currentUsers,
        newUsers,
        allRoles,
        fetchData,
        loading,
        loggedIn,
        changeLoginStatus
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