import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu"
import { getUser, logOut } from "../../actions/LoginActions"
import { askForConfirmation } from "../helpers/Helpers"
import { useHistory } from "react-router-dom"

const Header = ({ location, t }) => {
    let history = useHistory();
    const { user } = getUser();
    const closeFunc = () => {
        return false
    }
    const acceptFunc = async () => {
        let res = await logOut()
        if (res) {
            history.push("/")
        }
    }
    const confirmationDialog = () => {
        askForConfirmation(t("main.logout_confirm_text"), t("main.logout_confirm"), acceptFunc, closeFunc)
    }
    const redirectToControl = () => {
        history.push("/hallinta")
    }
    return (
        <div className="header-container">
            <Link to="/" ><h4 className="header-container-text">{t("main.title")}</h4></Link>
            <div className="left-header-container">
                <div className="language-menu-container">
                    <LanguageMenu t={t} />
                </div>
                {user &&
                    <div className="header-user-container">
                        <u onClick={redirectToControl}>{user ? user.email : ""}</u>
                        <button onClick={confirmationDialog} className="btn btn-primary">{t("main.logout")}</button>
                    </div>}
            </div>


            {/* {location.pathname !== "/hallinta" && <span className="header-login-button">
                    <Link to="/hallinta" >
                        <button className="btn btn-primary" >Kirjaudu</button>
                    </Link>
                </span>} */}
        </div>
    )
}


export default Header;