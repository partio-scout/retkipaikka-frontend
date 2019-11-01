import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION
} from "./ActionTypes"

export const selectLocation = (payload) => {
    // handles the map side slider show on map clicks
    // so if user clicks show on map, save coordinates 
    // and then show the location on map
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
    // saves the map click coordinates 
    // coordinate value is used in location form
    console.log(payload);
    return {
        type: SET_COORDINATES,
        coords: payload



    }
}