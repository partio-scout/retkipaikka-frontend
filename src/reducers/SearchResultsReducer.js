import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS
} from "../actions/ActionTypes"

const initialState = {
    searchResults: [],
    filteredResults: []
}




export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                searchResults: action.payload,
                filteredResults: action.payload
            }
        case UPDATE_RESULTS:
            return {
                ...state,
                filteredResults: action.payload,
            }
        default:
            return state;
    }
}
