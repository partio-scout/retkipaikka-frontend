import {
    SET_LANGUAGE,
    LOADING
} from "../actions/ActionTypes"



const initialState = {
    language: "fi",
    loading: false

}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.language

            }
        case LOADING:
            return {
                ...state,
                loading: action.loading

            }
        default:
            return state;
    }
}
