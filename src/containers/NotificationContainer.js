import React, { useEffect, useState } from "react";
import Notifications from "./Notifications"
import { fetchAllNotifications, useLoading } from "../helpers/Helpers"

const NotificationContainer = (props) => {
    const { t } = props;
    const { spinner, setLoading } = useLoading();
    const [notifications, setNotifications] = useState([])
    const handleFetch = () => {
        fetchAllNotifications(false, true).then(res => {
            if (res.data) {
                setNotifications(res.data);
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        handleFetch()
    }, [])



    return (
        <>
            {spinner}
            <Notifications t={t} notifications={notifications} />
        </>
    )
}
export default NotificationContainer;