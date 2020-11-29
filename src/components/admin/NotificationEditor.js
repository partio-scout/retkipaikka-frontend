import React, { useState, useEffect } from "react";
import Notifications from "../../containers/Notifications"
import NotificationCreator from "../admin/NotificationCreator"
import { fetchAllNotifications, useLoading, useTraceUpdate } from "../../helpers/Helpers"
import InfoDialog from "./dialogs/InfoDialog"
import NotificationComponent from "../notifications/NotificationComponent";
import { useTranslation } from "react-i18next";
import { useAdminContext } from "../../context/AdminContext";
const NotificationEditor = (props) => {
    const { t } = props;
    const [clickedObj, setClickedObj] = useState(null);
    const { notifications, setNotifications } = useAdminContext()
    const handleFetch = () => {
        fetchAllNotifications().then(res => {
            if (res.data) {
                setNotifications(res.data)

            }
        })
    }
    useEffect(() => {
        if (notifications.length == 0) {
            handleFetch()
        }

    }, [])

    const handleCloseAfterAction = () => {
        setClickedObj(null);
        handleFetch();
    }

    return (<div className="admin-content-container">
        <NotificationCreator handleClose={handleFetch} t={t} />
        <Notifications showInfoText={true} showHover={true} t={t} fullWidth={true} maxWidth={false} notifications={notifications} handleCardClick={(obj) => setClickedObj(obj)} />
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