import React, { createContext, useState, useContext } from 'react';
import Admin from '../containers/Admin';
import { useUserData } from "../helpers/UserHelper"


const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const { currentUsers, newUsers, allRoles, fetchData } = useUserData();

    console.log(currentUsers, newUsers, allRoles)
    const store = {
        currentUsers,
        newUsers,
        allRoles,
        fetchData
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