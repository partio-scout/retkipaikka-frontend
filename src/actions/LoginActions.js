
import {
    LOG_IN,
    LOG_OUT,
    ALERT_MESSAGE
} from "./ActionTypes"



export const login = () => {
    //localStorage.setItem('user', JSON.stringify(user));
    return {
        type: LOG_IN,



    }
}

const loginFail = () => {
    return {
        type: ALERT_MESSAGE,
        success: true,
        msg: "Kirjautuminen epäonnistui"

    }
}



