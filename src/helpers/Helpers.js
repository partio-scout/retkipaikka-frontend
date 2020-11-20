import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Spinner from "../components/shared/Spinner"
import { getUser } from "./UserHelper"
import axios from "axios"
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

const clearFormByClassName = (cn, formId = null) => {
    let doc = document;
    if (formId) {
        doc = document.getElementById(formId);
    }
    let fields = doc.getElementsByClassName(cn);
    for (let f of fields) {
        console.log("in loop")
        f.value = ""
    }

}
const fetchAllNotifications = (fetchAll, enabled) => {
    let query = {};
    if (!fetchAll) {
        query.where = { enabled: enabled }
    }
    return axios.get(_API_PATH_ + "/Notifications?filter=" + JSON.stringify(query));
}
const fetchNotification = () => {
    const query = {

    }
    return axios.get(_API_PATH_ + "/Notifications?filter=" + JSON.stringify(query));
}

const postNotification = async (object) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.post(_API_PATH_ + "/Notifications?access_token=" + id, object).then(res => {
            console.log(res)
            if (res.status === 200) {
                status = true;
                window.alert("Ilmoitus tallennettu")
            }
        }).catch(e => {
            window.alert("Ilmoituksen tallennus epäonnistui")
        })
    }

    return status;
}

const useDynamicState = (initialState) => {
    initialState = initialState ? initialState : {}
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({ ...state, [e.target.id]: value });

    }
    const setByKey = (key, data) => {
        setState({ ...state, [key]: data })
    }

    return {
        handleChange,
        setByKey,
        state,
        setState
    }

}
const useLoading = (initial = true) => {
    const [loading, setLoading] = useState(initial);


    return {
        spinner: loading ? <Spinner loading={loading} /> : <></>,
        setLoading,
        loading
    }
}


const useScreenSize = () => {
    const isMobile = useMediaQuery('(min-width:768px');

    return {
        isMobile: !isMobile
    }
}
export { useDynamicState, askForConfirmation, clearFormByClassName, useScreenSize, fetchNotification, postNotification, fetchAllNotifications, useLoading }