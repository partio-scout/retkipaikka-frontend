import {
    LOG_IN,
    LOG_OUT
} from "../actions/ActionTypes"

let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: user !== null,
    loggedUser: user,


}


export default function (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                loggedUser: null
            }

        default:
            return state;
    }
}
