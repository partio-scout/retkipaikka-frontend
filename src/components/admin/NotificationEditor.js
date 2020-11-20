import React, { useState, useEffect } from "react";
import Notifications from "../../containers/Notifications"
import NotificationCreator from "../admin/NotificationCreator"
import { fetchAllNotifications, useLoading } from "../../helpers/Helpers"
import InfoDialog from "./dialogs/InfoDialog"
import NotificationComponent from "../notifications/NotificationComponent";
const NotificationEditor = (props) => {
    const { t } = props;
    const [notifications, setNotifications] = useState([])
    const [clickedObj, setClickedObj] = useState(null);
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
    const handleCloseAfterAction = () => {
        setLoading(true);
        setClickedObj(null);
        handleFetch();
    }
    return (<div className="admin-content-container">
        <NotificationCreator t={t} />
        {spinner}
        <Notifications showHover={true} t={t} fullWidth={true} maxWidth={false} notifications={notifications} handleCardClick={(obj) => setClickedObj(obj)} />
        {clickedObj !== null &&
            <InfoDialog open={clickedObj !== null} dialogTitle={t("admin.notification_edit")} handleClose={() => setClickedObj(null)}>
                <NotificationCreator
                    t={t}
                    data={clickedObj}
                    editing={true}
                    handleClose={handleCloseAfterAction}
                />

            </InfoDialog>
        }
    </div>)
}

export default NotificationEditor;