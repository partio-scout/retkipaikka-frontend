import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION
} from "../actions/ActionTypes"


const initialState = {
    coords: null,
    selectedLocation: null
}


export default function (state = initialState, action) {

    console.log(action);
    switch (action.type) {
        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: action.obj
            }
        case RESET_LOCATION:
            return {
                ...state,
                selectedLocation: null
            }
        case SET_COORDINATES:
            return {
                ...state,
                coords: action.coords
            }
        default:
            return state;
    }
}