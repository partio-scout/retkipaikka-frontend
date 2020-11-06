import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom"
import { checkLoginStatus } from "../helpers/UserHelper";
import Spinner from "../components/shared/Spinner"
import { useAdminContext } from "../context/AdminContext";

const PrivateRoutes = ({ component: Component, ...rest }) => {
    // const [userLoginStatus, setUserLoginStatus] = useState({ loading: true, loggedIn: false })
    const { loggedIn, loading } = useAdminContext()
    return (<Route
        {...rest}
        render={props =>
            loading ? <Spinner loading={loading} /> : loggedIn ?
                <Component {...rest} /> :
                <Redirect
                    to={{
                        pathname: "/kirjaudu",
                        state: { from: props.location }
                    }}
                />
        } />)
}


export default PrivateRoutes
