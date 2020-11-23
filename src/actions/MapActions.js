import {
    SET_COORDINATES,
    SELECT_LOCATION,
    RESET_LOCATION,
    SELECT_MHEADER_LOCATION,
    RESET_MHEADER_LOCATION
} from "./ActionTypes"

import axios from "axios";
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
const fetchSingleLocation = async (payload) => {
    let filter = {
        where: { location_id: payload.location_id }
    }
    return await axios.get(_API_PATH_ + "/Triplocations/fetchLocations?filter=" + JSON.stringify(filter));

}
export const selectMapHeaderLocation = (payload) => async (dispatch) => {

    if (payload != null) {
        fetchSingleLocation(payload).then(res => {
            if (res.data.length > 0) {
                dispatch({
                    type: SELECT_MHEADER_LOCATION,
                    obj: res.data[0]
                })
            }
        })

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