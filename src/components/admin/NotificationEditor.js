import React, { useState, useEffect } from "react";
import Notifications from "../../containers/Notifications"
import NotificationCreator from "../admin/NotificationCreator"
import { fetchAllNotifications, useLoading } from "../../helpers/Helpers"
const NotificationEditor = (props) => {
    const { t } = props;
    const [notifications, setNotifications] = useState([])
    const { spinner, setLoading } = useLoading();
    const handleFetch = () => {
        fetchAllNotifications().then(res => {
            if (res.data) {
                setNotifications(res.data)
                setLoading(false)
            }
        })
    }
    useEffect(() => {
        handleFetch()
    }, [])
    return (<div className="admin-content-container">
        <NotificationCreator t={t} />
        {spinner}
        <Notifications t={t} fullWidth={true} maxWidth={false} notifications={notifications} />
    </div>)
}

export default NotificationEditor;