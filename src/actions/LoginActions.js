
import {
    LOG_IN,
    LOG_OUT
} from "./ActionTypes"
import axios from "axios";



export const login = async (dataObj) => {
    //localStorage.setItem('user', JSON.stringify(user));
    // axios.post(
    // _API_PATH_ + "/Filters", data
    let status = false;
    try {
        await axios.post(_API_PATH_ + "/Users/login?", dataObj).then(res => {
            console.log(res);
            if (res.data.id) {
                localStorage.setItem('user', JSON.stringify(res.data))
                status = true;
                // dispatch({
                //     type: LOG_IN,
                //     payload: res.data.id
                // })
            } else {
                window.alert("Kirjautuminen epäonnistui!")

            }
        })
    } catch (error) {
        console.error(error)
        window.alert("Kirjautuminen epäonnistui!")
    }
    return status;
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const checkLoginStatus = async () => {
    const user = localStorage.getItem('user')
    console.log("checkLoginStatus", "LOGINSTATUS")
    if (user) {
        if (IsJsonString(user)) {
            const { id, userId } = JSON.parse(user);
            return await axios.get(_API_PATH_ + "/Users/checkAccessToken/" + id).then(res => {
                console.log(res, "RESASDASD")
                return res.data;
            })
        }



    }
    return false
}





