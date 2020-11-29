import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu"
import { fetchNotification, getCorrectTranslation, getItemFromLocalStore } from "../../helpers/Helpers"
import AdminLogout from "./AdminLogout"
import AlertComponent from "../shared/AlertComponent"
import { useSelector } from "react-redux"




const Header = (props) => {
    const { location, t } = props;
    const [notifications, setNotifications] = useState([])
    const language = useSelector(state => state.general.language)
    useEffect(() => {

        fetchNotification().then(res => {
            if (res.data.length > 0) {
                setNotifications(res.data);
                //{ title: "Testi-ilmoitus" }
            }

        })
    }, [])
    const onNotificationClose = (data) => {
        let localStorageNotifications = getItemFromLocalStore("notifications", []);
        localStorageNotifications.push(data.notification_id);
        localStorage.setItem("notifications", JSON.stringify(localStorageNotifications));
        let newNotis = notifications.filter(n => n.notification_id !== data.notification_id);
        setNotifications(newNotis);
    }
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
            {location.pathname === "/" && notifications != null &&
                notifications.map(n => {
                    return (
                        <div className="header-alert" key={n.notification_id}>
                            <AlertComponent title={
                                <div className="header-notification">
                                    <Link to="/ilmoitukset" >
                                        {getCorrectTranslation(n, "title", language)}
                                    </Link>
                                </div>
                            }
                                data={n}
                                onClose={onNotificationClose}
                            //onClose={onNotificationClose}
                            />
                        </div>
                    )
                })
            }

        </div>

    )
}


export default Header;