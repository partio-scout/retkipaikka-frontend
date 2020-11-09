import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu"
import { getUser, logOut } from "../../helpers/UserHelper"
import { askForConfirmation } from "../../helpers/Helpers"
import { useHistory } from "react-router-dom"
import AdminLogout from "./AdminLogout"
const Header = ({ location, t }) => {
    return (
        <div className="header-container">
            <Link to="/" ><h4 className="header-container-text">{t("main.title")}</h4></Link>
            <div className="left-header-container">
                <div className="language-menu-container">
                    <LanguageMenu t={t} />
                </div>
                <AdminLogout t={t} />
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