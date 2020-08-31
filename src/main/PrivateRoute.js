import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom"
import { checkLoginStatus } from "../actions/LoginActions";
import ClipLoader from "react-spinners/ClipLoader";

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

    const spinner = () => {
        return (
            <div className="sweet-loading">
                <ClipLoader
                    size={150}
                    color={"#123abc"}
                    loading={loginStatus.loading}
                />
            </div>)
    }
    console.log(Component, rest)
    return (<Route
        {...rest}
        render={props =>
            loginStatus.loading ? spinner() : loginStatus.loggedIn ?
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
