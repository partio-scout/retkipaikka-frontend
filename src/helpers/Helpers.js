import React, { useEffect, useState, useRef } from "react";
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
        f.value = ""
    }

}
const fetchAllNotifications = (fetchAll, enabled) => {
    let query = { order: "updatedAt DESC" };
    if (!fetchAll) {
        query.where = { enabled: enabled }
    }
    return axios.get(_API_PATH_ + "/Notifications?filter=" + JSON.stringify(query));
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const getItemFromLocalStore = (key, defaultReturn) => {
    const item = localStorage.getItem(key)
    if (IsJsonString(item) && item !== null) {
        return JSON.parse(item)
    }
    return defaultReturn;
}

const fetchNotification = () => {
    let notifications = getItemFromLocalStore("notifications", [])
    let query = {
        fields: ["notification_id", "title", "title_en", "title_sv", "title_sa"]
    }
    if (notifications.length === 0) {
        query.where = { display_frontpage: true }
    } else {
        query.where = { and: [{ display_frontpage: true }, { notification_id: { nin: notifications } }] };
    }
    return axios.get(_API_PATH_ + "/Notifications?filter=" + JSON.stringify(query));

}



const postNotification = async (object) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.post(_API_PATH_ + "/Notifications?access_token=" + id, object).then(res => {
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

const editNotification = async (notification_id, object) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.patch(_API_PATH_ + "/Notifications/" + notification_id + "?access_token=" + id, object).then(res => {
            if (res.status === 200) {
                status = true;
                window.alert("Ilmoituksen muokkaus onnistui")
            }
        }).catch(e => {
            window.alert("Ilmoituksen muokkaus epäonnistui")
        })
    }

    return status;
}
const deleteNotification = async (notification_id) => {
    const { id } = getUser();
    let status = false;
    if (id) {
        await axios.delete(_API_PATH_ + "/Notifications/" + notification_id + "?access_token=" + id).then(res => {
            if (res.status === 200) {
                status = true;
                window.alert("Ilmoituksen poisto onnistui")
            }
        }).catch(e => {
            window.alert("Ilmoituksen poisto epäonnistui")
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

const getCorrectTranslation = (data, key, lang) => {
    let langEnd = key + "_" + lang;
    return (lang === "fi" ? data[key] : data[langEnd] ? data[langEnd] : data[key + "_en"] ? data[key + "_en"] : data[key]);
}
const useScreenSize = () => {
    const isMobile = useMediaQuery('(min-width:768px');

    return {
        isMobile: !isMobile
    }
}
function useTraceUpdate(props, name) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log(name, ' Changed props:', changedProps);
        }
        prev.current = props;
    });
}
export { getCorrectTranslation, getItemFromLocalStore, useTraceUpdate, useDynamicState, askForConfirmation, clearFormByClassName, useScreenSize, fetchNotification, postNotification, fetchAllNotifications, useLoading, editNotification, deleteNotification }