import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
const AlertComponent = (props) => {
    const [open, setOpen] = useState(true)
    const { title, text, onClose, data } = props;

    return (
        <div>
            <Collapse in={open}>
                <Alert severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                onClose(data)
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <AlertTitle>{title}</AlertTitle>
                    {text}
                </Alert>
            </Collapse>

        </div>

    )


}
AlertComponent.defaultProps = {
    title: "Notification",
    text: null,
    onClose: () => { },
    data: {}

}

export default AlertComponent;