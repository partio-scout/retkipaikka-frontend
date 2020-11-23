import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu"
import { getUser, logOut } from "../../helpers/UserHelper"
import { askForConfirmation, fetchNotification, useScreenSize } from "../../helpers/Helpers"
import { useHistory } from "react-router-dom"
import AdminLogout from "./AdminLogout"
import InfoIcon from '@material-ui/icons/Info';
import { useTranslation } from 'react-i18next';
import AlertComponent from "../shared/AlertComponent"



const Header = (props) => {
    const { location, t } = props;
    const [notification, setNotification] = useState({ title: "Testi-ilmoitus" })
    useEffect(() => {

        fetchNotification().then(res => {
            if (res.length > 0) {
                setNotification(res.data[0]);
            }

        })
    }, [])

    return (
        <div>
            <div className="header-container">
                <div className="left-header-container">
                    <div>
                        <Link to="/" ><h4 className="header-container-text">{t("main.title")}</h4></Link>
                    </div>
                </div>
                <div className="right-header-container">
                    <div className="language-menu-container">
                        <LanguageMenu t={t} />
                    </div>
                    <AdminLogout t={t} />
                </div>
            </div>
            {location.pathname === "/" &&
                <div className="header-alert">
                    <AlertComponent title={
                        <div className="header-notification">
                            <Link to="/ilmoitukset" >
                                {notification.title}
                            </Link>
                        </div>
                    } />
                </div>}

        </div>

    )
}


export default Header;