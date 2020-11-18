import React from "react";
import Notifications from "../../containers/Notifications"
import NotificationCreator from "../admin/NotificationCreator"

const NotificationEditor = (props) => {
    const { t } = props;
    return (<div className="admin-content-container">
        <NotificationCreator t={t} />
        <Notifications t={t} fullWidth={true} maxWidth={false} />
    </div>)
}

export default NotificationEditor;