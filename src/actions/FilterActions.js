import {
    ADD_LOCATION_FILTER,
    REMOVE_LOCATION_FILTER,
    ADD_LOCATIONTYPE_FILTER,
    REMOVE_LOCATIONTYPE_FILTER,
    ADD_COMMON_FILTER,
    REMOVE_COMMON_FILTER,
    REMOVE_ALL_COMMON_FILTERS,
    REMOVE_ALL_LOCATIONTYPE_FILTERS,
    UPDATE_FETCHED_FILTERS,
    UPDATE_FETCHED_AREAS
} from "./ActionTypes"

import axios from "axios";
import { getUser } from "../helpers/UserHelper"
import { getCorrectTranslation } from "../helpers/Helpers"
export const addFilter = (obj) => {
    let actionType = ""
    // handles the input form filters
    // add filter tag depending on the type
    switch (obj.object_type) {
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
    switch (obj.object_type) {
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

export const fetchRegionsAndMunicipalities = () => async (dispatch) => {
    // http://localhost:3000/api/Regions
    let locations = { regions: [], municipalities: [] }
    try {
        const regionResponse = await axios.get(_API_PATH_ + "/Regions");
        locations.regions = locations.regions.concat(regionResponse.data);

        const municipalityResponse = await axios.get(_API_PATH_ + "/Municipalities");
        locations.municipalities = locations.municipalities.concat(municipalityResponse.data);
    } catch (error) {
        console.error(error);
    }

    // let locationTypeFilters = [{ category_id: 0, object_type: "nolocationtype", object_name: "Kaikki" }, { category_id: 1, object_type: "locationtype", object_name: "Laavu" }, { category_id: 2, object_type: "locationtype", object_name: "Kämppä" }, { category_id: 3, object_type: "locationtype", object_name: "Alue" }, { category_id: 4, object_type: "locationtype", object_name: "Venelaituri" }]
    // let commonFilters = [{ filter_id: 0, object_type: "nofilter", object_name: "Ei suodattimia" }, { filter_id: 1, object_type: "filter", object_name: "Sauna" }, { filter_id: 2, object_type: "filter", object_name: "Järvi lähellä" }, { filter_id: 3, object_type: "filter", object_name: "Laituri" }, { filter_id: 4, object_type: "filter", object_name: "Sisämajoitus" }, { filter_id: 5, object_type: "filter", object_name: "Sisävessa" },
    // { filter_id: 6, object_type: "filter", object_name: "Juomavesi" }, { filter_id: 7, object_type: "filter", object_name: "Sähkö" }, { filter_id: 8, object_type: "filter", object_name: "Ei majoitusta" }, { filter_id: 9, object_type: "filter", object_name: "Alle 5 majoituspaikkaa" }, { filter_id: 10, object_type: "filter", object_name: "Yli 5 majoituspaikkaa" }, { filter_id: 11, object_type: "filter", object_name: "Yli 10 majoituspaikkaa" },
    // { filter_id: 12, object_type: "filter", object_name: "Yli 20 majoituspaikkaa" }]

    // const locations = { locations: locationTypeFilters, common: commonFilters }
    dispatch({
        type: UPDATE_FETCHED_AREAS,
        payload: locations
    })

}
export const postFilter = (data) => (dispatch, getState) => {
    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.post(
        _API_PATH_ + "/Filters" + accessToken, data
    ).then(response => {
        window.alert("Suodattimen lisäys onnistui")
        dispatch(fetchFilters())
    }).catch(error => {
        window.alert("Virhe suodattimen lisäämisessä")
    });
}
export const editFilter = (data) => (dispatch, getState) => {

    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.patch(
        _API_PATH_ + "/Filters/" + data.filter_id + accessToken, data
    ).then(response => {
        window.alert("Suodattimen muokkaus onnistui")
        dispatch(fetchFilters())
    }).catch(error => {
        window.alert("Virhe suodattimen muokkaamisessa")
    });

}
export const editCategory = (data) => (dispatch, getState) => {

    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.patch(
        _API_PATH_ + "/Categories/" + data.category_id + accessToken, data
    ).then(response => {
        window.alert("Kategorian muokkaus onnistui")
        dispatch(fetchFilters())
    }).catch(error => {
        window.alert("Virhe kategorian muokkaamisessa")
    });

}
export const postCategory = (data) => (dispatch, getState) => {
    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.post(
        _API_PATH_ + "/Categories" + accessToken, data
    ).then(response => {
        window.alert("Kategorian lisäys onnistui")
        dispatch(fetchFilters())
    }).catch(error => {
        window.alert("Virhe suodattimen lisäämisessä")
    });
}

export const deleteCategory = (data) => (dispatch, getState) => {
    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.get(
        _API_PATH_ + "/Categories/" + data.category_id + "/triplocations/count"
    ).then(response => {
        if (response.data.count === 0) {
            axios.delete(_API_PATH_ + "/Categories/" + data.category_id + accessToken).then(res => {
                window.alert("Kategorian poisto onnistui")
                dispatch(fetchFilters())
            })
        } else {
            window.alert("et voi poistaa kategoriaa joka on käytössä")
        }

    }).catch(error => {
        window.alert("Virhe poistamisessa")
        console.error(error)
    });
}
export const deleteFilter = (data) => (dispatch, getState) => {
    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    axios.get(
        _API_PATH_ + "/Filters/" + data.filter_id + "/triplocations/count"
    ).then(response => {
        if (response.data.count === 0) {
            axios.delete(_API_PATH_ + "/Filters/" + data.filter_id + accessToken).then(res => {
                window.alert("Suodattimen poisto onnistui")
                dispatch(fetchFilters())
            });

        } else {
            window.alert("Et voi poistaa suodatinta joka on käytössä")
        }

    }).catch(error => {
        window.alert("Virhe poistamisessa")
        console.error(error);
    });
}



export const fetchFilters = () => async (dispatch) => {
    // fetch filters from database 
    let locations = {
        categories: [{ category_id: 0, object_type: "nolocationtype", object_name: "Kaikki", object_name_en: "All", object_name_sv: "Allt", object_name_sa: "Buot" }],
        filters: [{ filter_id: 0, object_type: "nofilter", object_name: "Ei suodattimia", object_name_en: "No filters", object_name_sv: "Inga filter", object_name_sa: "Ii filterduhpát" }]
    }
    try {
        const categoryResponse = await axios.get(_API_PATH_ + "/Categories");
        locations.categories = locations.categories.concat(categoryResponse.data);

        const filterResponse = await axios.get(_API_PATH_ + "/Filters");
        locations.filters = locations.filters.concat(filterResponse.data);
    } catch (error) {
        console.error(error);
    }
    // let locationTypeFilters = [{ category_id: 0, object_type: "nolocationtype", object_name: "Kaikki" }, { category_id: 1, object_type: "locationtype", object_name: "Laavu" }, { category_id: 2, object_type: "locationtype", object_name: "Kämppä" }, { category_id: 3, object_type: "locationtype", object_name: "Alue" }, { category_id: 4, object_type: "locationtype", object_name: "Venelaituri" }]
    // let commonFilters = [{ filter_id: 0, object_type: "nofilter", object_name: "Ei suodattimia" }, { filter_id: 1, object_type: "filter", object_name: "Sauna" }, { filter_id: 2, object_type: "filter", object_name: "Järvi lähellä" }, { filter_id: 3, object_type: "filter", object_name: "Laituri" }, { filter_id: 4, object_type: "filter", object_name: "Sisämajoitus" }, { filter_id: 5, object_type: "filter", object_name: "Sisävessa" },
    // { filter_id: 6, object_type: "filter", object_name: "Juomavesi" }, { filter_id: 7, object_type: "filter", object_name: "Sähkö" }, { filter_id: 8, object_type: "filter", object_name: "Ei majoitusta" }, { filter_id: 9, object_type: "filter", object_name: "Alle 5 majoituspaikkaa" }, { filter_id: 10, object_type: "filter", object_name: "Yli 5 majoituspaikkaa" }, { filter_id: 11, object_type: "filter", object_name: "Yli 10 majoituspaikkaa" },
    // { filter_id: 12, object_type: "filter", object_name: "Yli 20 majoituspaikkaa" }]

    // const locations = { locations: locationTypeFilters, common: commonFilters }
    dispatch({
        type: UPDATE_FETCHED_FILTERS,
        payload: locations
    })

}

export const getCorrectFilter = (filter, lang) => {
    return getCorrectTranslation(filter, "object_name", lang)
    // return (lang === "fi" ? filter["object_name"] : filter[langEnd] ? filter[langEnd] : filter["object_name_en"] ? filter["object_name_en"] : filter["object_name"])
}

