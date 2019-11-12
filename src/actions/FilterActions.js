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
    let locationTypeFilters = [{ id: 0, category_type: "nolocationtype", filter_name: "Kaikki" }, { id: 1, category_type: "locationtype", filter_name: "Laavu" }, { id: 2, type: "locationtype", text: "Kämppä" }, { id: 3, type: "locationtype", filter_name: "Alue" }, { id: 4, type: "locationtype", filter_name: "Venelaituri" }]
    let commonFilters = [{ id: 0, filter_type: "nofilter", filter_name: "Ei suodattimia" }, { id: 1, filter_type: "filter", filter_name: "Sauna" }, { id: 2, filter_type: "filter", filter_name: "Järvi lähellä" }, { id: 3, filter_type: "filter", filter_name: "Laituri" }, { id: 4, filter_type: "filter", filter_name: "Sisämajoitus" }, { id: 5, filter_type: "filter", filter_name: "Sisävessa" },
    { id: 6, filter_type: "filter", filter_name: "Juomavesi" }, { id: 7, filter_type: "filter", filter_name: "Sähkö" }, { id: 8, filter_type: "filter", filter_name: "Ei majoitusta" }, { id: 9, filter_type: "filter", filter_name: "Alle 5 majoituspaikkaa" }, { id: 10, filter_type: "filter", filter_name: "Yli 5 majoituspaikkaa" }, { id: 11, filter_type: "filter", filter_name: "Yli 10 majoituspaikkaa" },
    { id: 12, filter_type: "filter", filter_name: "Yli 20 majoituspaikkaa" }]

    const locations = { locations: locationTypeFilters, common: commonFilters }
    return {
        type: UPDATE_FETCHED_FILTERS,
        payload: locations
    }
}


