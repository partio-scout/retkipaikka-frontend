import React from "react";
import Draggable from 'react-draggable';

const DraggableDialog = (props) => {
    const { customClassName, handleClose, clickHeight, t, children } = props;
    let className = "admin-info-dialog";


    return (
        <Draggable
            handle=".move-handle">
            <div style={{ top: clickHeight.height, left: clickHeight.width }} className={customClassName ? className + customClassName : className}>
                <button className="btn info-close-button" onClick={handleClose}>x</button>
                <div className="side-slider-data">
                    {children}
                </div>
            </div>

        </Draggable>



    )
}

export default DraggableDialog;