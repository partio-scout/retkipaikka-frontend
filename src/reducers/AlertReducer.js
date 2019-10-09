import {
    ALERT_MESSAGE,
    RESET_MESSAGE
} from "../actions/ActionTypes"



const initialState = {
    msg: null,
    success: null,
    open: false

}


export default function (state = initialState, action) {
    switch (action.type) {
        case ALERT_MESSAGE:
            return {
                ...state,
                msg: action.msg,
                success: action.success,
                open: true
            }
        case RESET_MESSAGE:
            return {
                ...initialState

            }

        default:
            return state;
    }
}
