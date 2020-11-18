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
    const { t, fullWidth, maxWidth } = props;
    const [data, setData] = useState([])
    const classes = useStyles()
    return (<Container className={classes.container} style={fullWidth && { paddingTop: 0, paddingBottom: 0 }} maxWidth={maxWidth} disableGutters={fullWidth}>
        <h3 style={{ paddingBottom: "1rem" }}>{t("main.notification_title")}</h3>
        {data.map(d => {
            return (
                <div className={classes.card} >
                    <NotificationComponent
                        title="testi-ilmoitus"
                        text="testi-ilmoitus testi-ilmoitus testi-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitus"
                        linkUrl="www.google.com"
                        topTitle="ilmoitus"
                    />
                </div>)
        })}
        <div className={classes.card} >
            <NotificationComponent
                title="testi-ilmoitus"
                text="testi-ilmoitus testi-ilmoitus testi-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitus"
                linkUrl="www.google.com"
                topTitle="ilmoitus"
            />
        </div>
        <div className={classes.card}>
            <NotificationComponent
                title="testi-ilmoitus"
                text="testi-ilmoitus testi-ilmoitus testi-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitus"
                linkUrl="www.google.com"
                topTitle="ilmoitus"
            />
        </div>
        <div className={classes.card}>
            <NotificationComponent
                title="testi-ilmoitus"
                text="testi-ilmoitus testi-ilmoitus testi-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitustesti-ilmoitus testi-ilmoitus"
                linkUrl="www.google.com"
                topTitle="ilmoitus"
            />
        </div>


    </Container>)
}
Notifications.defaultProps = {
    maxWidth: "lg",
    fullWidth: false

}
export default Notifications;