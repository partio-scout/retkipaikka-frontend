import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION,
    SELECT_MHEADER_LOCATION,
    RESET_MHEADER_LOCATION
} from "./ActionTypes"

export const selectLocation = (payload) => {
    // handles the map side slider show on map clicks
    // so if user clicks show on map, save coordinates 
    // and then show the location on map
    if (payload != null) {
        return {
            type: SELECT_LOCATION,
            obj: payload
        }
    }

}
export const selectMapHeaderLocation = (payload) => {
    if (payload != null) {
        return {
            type: SELECT_MHEADER_LOCATION,
            obj: payload
        }
    }
}
export const resetMapHeaderLocation = () => {
    return {
        type: RESET_MHEADER_LOCATION

    }
}
export const resetLocation = () => {
    return {
        type: RESET_LOCATION

    }
}

export const setCoordinates = (payload) => {
    // saves the map click coordinates 
    // coordinate value is used in location form
    return {
        type: SET_COORDINATES,
        coords: payload



    }
}