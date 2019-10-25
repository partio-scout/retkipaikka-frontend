import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION
} from "./ActionTypes"

export const selectLocation = (payload) => {
    if (payload !== null) {
        return {
            type: SELECT_LOCATION,
            obj: payload
        }
    }

}
export const resetLocation = () => {
    console.log("reset");
    return {
        type: RESET_LOCATION

    }
}

export const setCoordinates = (payload) => {
    console.log(payload);
    return {
        type: SET_COORDINATES,
        coords: payload



    }
}