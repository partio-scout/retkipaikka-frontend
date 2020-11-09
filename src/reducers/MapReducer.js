import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION,
    SELECT_MHEADER_LOCATION,
    RESET_MHEADER_LOCATION
} from "../actions/ActionTypes"


const initialState = {
    coords: null,
    selectedLocation: null,
    mapHeaderLocation: null
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_LOCATION:
            console.log(action.obj, "DATA")
            return {
                ...state,
                selectedLocation: action.obj
            }
        case RESET_LOCATION:
            return {
                ...state,
                selectedLocation: null
            }
        case SELECT_MHEADER_LOCATION:
            return {
                ...state,
                mapHeaderLocation: action.obj
            }
        case RESET_MHEADER_LOCATION:
            return {
                ...state,
                mapHeaderLocation: null
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