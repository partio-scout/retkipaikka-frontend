import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const askForConfirmation = (message, title, onYesClick, onNoClick, childrenElement = () => { }) => {
    confirmAlert({
        title: title,
        message: message,
        childrenElement: childrenElement,
        buttons: [
            {
                label: 'Kyllä',
                onClick: onYesClick
            },
            {
                label: 'Ei',
                onClick: onNoClick

            }
        ]
    });
};

const clearFormByClassName = (cn) => {
    let fields = document.getElementsByClassName(cn);
    for (let f of fields) {
        f.value = ""
    }

}


const useDynamicState = (initialState) => {
    initialState = initialState ? initialState : {}
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({ ...state, [e.target.id]: value });

    }
    return {
        handleChange,
        state
    }

}

export { useDynamicState, askForConfirmation, clearFormByClassName }