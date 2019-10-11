import {
    SET_COORDINATES
} from "../actions/ActionTypes"


const initialState = {
    coords: null
}


export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                coords: action.coords
            }
        default:
            return state;
    }
}