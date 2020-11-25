import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS,
    FETCH_NON_ACCEPTED,
    PREVIOUS_FILTER
} from "../actions/ActionTypes"

const initialState = {
    searchResults: [],
    filteredResults: [],
    notificationResults: [],
    previousFilter: {
        commonFilters: [],
        locationFilters: [],
        locationTypeFilters: []
    }
}




export default function (state = initialState, action) {
    console.log(action)
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
        case FETCH_NON_ACCEPTED:
            return {
                ...state,
                notificationResults: action.payload
            }
        case PREVIOUS_FILTER:
            return {
                ...state,
                previousFilter: action.payload
            }
        default:
            return state;
    }
}
