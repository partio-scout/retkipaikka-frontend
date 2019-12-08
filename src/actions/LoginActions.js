
import {
    LOG_IN,
    LOG_OUT,
    ALERT_MESSAGE
} from "./ActionTypes"
import axios from "axios";



export const login = (dataObj) => async (dispatch) => {
    //localStorage.setItem('user', JSON.stringify(user));
    // axios.post(
    // _API_PATH_ + "/Filters", data
    try {
        await axios.post(_API_PATH_ + "/Users/login?", dataObj).then(res => {
            console.log(res);
            if (res.data.id) {
                dispatch({
                    type: LOG_IN,
                    payload: res.data.id
                })
            } else {
                window.alert("Kirjautuminen epäonnistui!")

            }
        })
    } catch (error) {
        console.error(error)
        console.log("asda")
        window.alert("Kirjautuminen epäonnistui!")
    }
}

const loginFail = () => {
    return {
        type: ALERT_MESSAGE,
        success: true,
        msg: "Kirjautuminen epäonnistui"

    }
}



