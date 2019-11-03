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
    // handles the input form filters
    // add filter tag depending on the type
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
    // remove filter tag depending on the type
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
    // fetch filters from database
    // currently hardcoded data
    let locationTypeFilters = [{ id: 0, type: "nolocationtype", text: "Kaikki" }, { id: 1, type: "locationtype", text: "Laavu" }, { id: 2, type: "locationtype", text: "Kämppä" }, { id: 3, type: "locationtype", text: "Alue" }, { id: 4, type: "locationtype", text: "Venelaituri" }]
    let commonFilters = [{ id: 0, type: "nofilter", text: "Ei suodattimia" }, { id: 1, type: "filter", text: "Sauna" }, { id: 2, type: "filter", text: "Järvi lähellä" }, { id: 3, type: "filter", text: "Laituri" }, { id: 4, type: "filter", text: "Sisämajoitus" }, { id: 5, type: "filter", text: "Sisävessa" }, { id: 6, type: "filter", text: "Juomavesi" }, { id: 7, type: "filter", text: "Sähkö" }, { id: 8, type: "filter", text: "Ei majoitusta" }, { id: 9, type: "filter", text: "Alle 5 majoituspaikkaa" }, { id: 10, type: "filter", text: "Yli 5 majoituspaikkaa" }, { id: 11, type: "filter", text: "Yli 10 majoituspaikkaa" }, { id: 12, type: "filter", text: "Yli 20 majoituspaikkaa" }]
    const locations = { locations: locationTypeFilters, common: commonFilters }
    return {
        type: UPDATE_FETCHED_FILTERS,
        payload: locations
    }
}


