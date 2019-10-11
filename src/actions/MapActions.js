import {
    SET_COORDINATES
} from "./ActionTypes"



export const setCoordinates = (payload) => {
    console.log(payload);
    return {
        type: SET_COORDINATES,
        coords: payload



    }
}