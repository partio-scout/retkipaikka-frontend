import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom"
import { checkLoginStatus } from "../actions/LoginActions";
import Spinner from "../helpers/Spinner"

const PrivateRoutes = ({ component: Component, ...rest }) => {
    const [loginStatus, setLoginStatus] = useState({ loading: true, loggedIn: false })

    useEffect(() => {
        async function handleLogin() {
            const loggedIn = await checkLoginStatus();
            console.log(loggedIn, "LOGINSTATUS")

            let obj = { loading: false, loggedIn: loggedIn }
            setLoginStatus(obj)
        }
        handleLogin()

    }, [])


    return (<Route
        {...rest}
        render={props =>
            loginStatus.loading ? <Spinner loading={loginStatus.loading} /> : loginStatus.loggedIn ?
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
