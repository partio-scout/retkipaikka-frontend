
import {
    SET_LANGUAGE
} from "./ActionTypes"


export const setLanguage = (language) => {
    //localStorage.setItem('user', JSON.stringify(user));
    // axios.post(
    // _API_PATH_ + "/Filters", data
    return {
        type: SET_LANGUAGE,
        language: language
    }

}





