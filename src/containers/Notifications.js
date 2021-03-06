import React, { useState } from "react";
import Container from "@material-ui/core/Container"
import NotificationComponent from "../components/notifications/NotificationComponent"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux"
import { getCorrectTranslation } from "../helpers/Helpers"
const useStyles = makeStyles({
    container: {
        paddingTop: "7rem",
    },
    card: {
        paddingBottom: "1rem"
    }


});
const Notifications = (props) => {
    const { t, fullWidth, maxWidth, notifications, handleCardClick, showHover, showInfoText } = props;
    const classes = useStyles()
    const language = useSelector(state => state.general.language)
    return (<Container className={classes.container} style={fullWidth ? { paddingTop: 0, paddingBottom: 0 } : {}} maxWidth={maxWidth} disableGutters={fullWidth}>
        <h3 style={{ paddingBottom: "1rem" }}>{t("main.notification_title")}</h3>
        {showInfoText && <strong style={{ paddingBottom: "1rem", display: "inline-block" }}> {t("admin.notification_info")}</strong>}
        {notifications.map(d => {
            return (
                <div key={d.notification_id} className={classes.card} >
                    <NotificationComponent
                        showHover={showHover}
                        title={getCorrectTranslation(d, "title", language)}
                        text={getCorrectTranslation(d, "text", language)}
                        linkUrl={d.link_url}
                        topTitle={getCorrectTranslation(d, "top_title", language)}
                        bottomTitle={getCorrectTranslation(d, "bottom_title", language)}
                        linkText={getCorrectTranslation(d, "link_text", language)}
                        isEnabled={d.enabled}
                        displayFrontpage={d.display_frontpage}
                        handleCardClick={() => handleCardClick(d)}
                    />
                </div>)
        })}
    </Container>)
}
Notifications.defaultProps = {
    maxWidth: "lg",
    fullWidth: false,
    notifications: [],
    handleCardClick: () => { },
    showHover: false,
    showInfoText: false

}
export default Notifications;