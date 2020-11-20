import React, { useState } from "react";
import Container from "@material-ui/core/Container"
import NotificationComponent from "../components/notifications/NotificationComponent"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        paddingTop: "7rem",
    },
    card: {
        paddingBottom: "1rem"
    }


});
const Notifications = (props) => {
    const { t, fullWidth, maxWidth, notifications } = props;
    const classes = useStyles()
    return (<Container className={classes.container} style={fullWidth ? { paddingTop: 0, paddingBottom: 0 } : {}} maxWidth={maxWidth} disableGutters={fullWidth}>
        <h3 style={{ paddingBottom: "1rem" }}>{t("main.notification_title")}</h3>
        {notifications.map(d => {
            return (
                <div key={d.notification_id} className={classes.card} >
                    <NotificationComponent
                        title={d.title}
                        text={d.text}
                        linkUrl={d.link_url}
                        topTitle={d.top_title}
                        bottomTitle={d.bottom_title}
                        linkText={d.link_text}
                        isEnabled={d.display_frontpage}
                    />
                </div>)
        })}
    </Container>)
}
Notifications.defaultProps = {
    maxWidth: "lg",
    fullWidth: false,
    notifications: []

}
export default Notifications;