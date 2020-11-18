import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    text: {
        wordBreak: "break-all"
    }
});

const NotificationComponent = (props) => {
    const { topTitle, title, bottomTitle, text, linkText, linkUrl } = props;
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {topTitle && <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {topTitle}
                </Typography>}
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                {bottomTitle && <Typography className={classes.pos} color="textSecondary">
                    {bottomTitle}
                </Typography>}
                <Typography className={classes.text} variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
            {linkUrl && <CardActions>
                <Button size="small">{linkText}</Button>
            </CardActions>}
        </Card>
    );
}
NotificationComponent.defaultProps = {
    topTitle: null,
    title: "",
    bottomTitle: null,
    text: "",
    linkText: "Lisätietoa",
    linkUrl: null
}
export default NotificationComponent;
