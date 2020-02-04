import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu"


const Header = ({ location, t }) => {

    return (
        <div className="header-container">
            <Link to="/" ><h4 className="header-container-text">{t("main.title")}</h4></Link>
            <div className="language-menu-container">
                <LanguageMenu t={t} />
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