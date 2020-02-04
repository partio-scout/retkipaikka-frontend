import {
    SET_LANGUAGE
} from "../actions/ActionTypes"



const initialState = {
    language: "fi"

}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language

            }
        default:
            return state;
    }
}
