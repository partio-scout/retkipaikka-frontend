import {
    ADD_LOCATION_FILTER,
    REMOVE_LOCATION_FILTER,
    ADD_LOCATIONTYPE_FILTER,
    REMOVE_LOCATIONTYPE_FILTER,
    ADD_COMMON_FILTER,
    REMOVE_COMMON_FILTER,
    REMOVE_ALL_COMMON_FILTERS,
    REMOVE_ALL_LOCATIONTYPE_FILTERS,
    UPDATE_FETCHED_FILTERS
} from "./ActionTypes"

export const addFilter = (obj) => {
    let actionType = ""

    switch (obj.type) {
        case "city":
            actionType = ADD_LOCATION_FILTER;
            break;
        case "locationtype":
            actionType = ADD_LOCATIONTYPE_FILTER;
            break;
        case "filter":
            actionType = ADD_COMMON_FILTER;
            break;
        case "nofilter":
            actionType = REMOVE_ALL_COMMON_FILTERS;
            break;
        case "nolocationtype":
            actionType = REMOVE_ALL_LOCATIONTYPE_FILTERS;
            break;
        default:
            break;
    }

    return {
        type: actionType,
        payload: obj
    }
}
export const removeFilter = (obj) => {
    let actionType = ""

    switch (obj.type) {
        case "city":
            actionType = REMOVE_LOCATION_FILTER;
            break;
        case "locationtype":
            actionType = REMOVE_LOCATIONTYPE_FILTER;
            break;
        case "filter":
            actionType = REMOVE_COMMON_FILTER;
            break;
        default:
            break;
    }
    return {
        type: actionType,
        payload: obj
    }



}

export const fetchFilters = () => {
    let locationTypeFilters = [{ type: "nolocationtype", text: "Kaikki" }, { type: "locationtype", text: "Laavu" }, { type: "locationtype", text: "Kämppä" }, { type: "locationtype", text: "Alue" }, { type: "locationtype", text: "Venelaituri" }]
    let commonFilters = [{ type: "nofilter", text: "Ei suodattimia" }, { type: "filter", text: "Sauna" }, { type: "filter", text: "Järvi lähellä" }, { type: "filter", text: "Laituri" }, { type: "filter", text: "Sisämajoitus" }, { type: "filter", text: "Sisävessa" }]
    const locations = { locations: locationTypeFilters, common: commonFilters }
    return {
        type: UPDATE_FETCHED_FILTERS,
        payload: locations
    }
}


