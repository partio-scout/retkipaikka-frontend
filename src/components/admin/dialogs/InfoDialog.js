import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoDialog = (props) => {
    const { children, dialogTitle, open, handleClose, maxWidth } = props;

    return (
        <div>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={maxWidth}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{ minWidth: "250px" }}>{dialogTitle}
                    <button className="btn info-close-button" onClick={handleClose}>x</button>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}
InfoDialog.defaultProps = {
    maxWidth: "md",
    fullWidth: false,
    open: false,
    dialogTitle: "Dialog",
    handleClose: () => { }
}
export default InfoDialog;