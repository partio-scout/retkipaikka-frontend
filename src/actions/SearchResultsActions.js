
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS,
    FETCH_NON_ACCEPTED,
    LOADING,
    PREVIOUS_FILTER
} from "./ActionTypes"



import axios from "axios";
import { getUser } from "../helpers/UserHelper"
import { setLoading } from "./GeneralActions";
import { getItemFromLocalStore } from "../helpers/Helpers"

export const locationFetch = async (query) => {
    let locations = [];
    try {
        locations = await axios.get(_API_PATH_ + "/Triplocations/fetchLocations?filter=" + JSON.stringify(query));
        locations = locations.data;
    } catch (error) {
        console.error(error);
    }
    return locations
}
const handleSaveAfterFetch = async (query) => {
    let locations = await locationFetch(query);
    let newLocalStore = { locationData: locations, latestLocation: locations[0].location_id };
    localStorage.setItem("locations", JSON.stringify(newLocalStore));
    return locations;
}
export const fetchLocations = (accepted, limitedFields = false, useCache = false) => async (dispatch) => {
    // fetch locations from database
    let query = {
        where: {
            location_accepted: accepted
        },
        limitedFields: limitedFields
    }
    let locations = [];
    if (!useCache) {
        locations = await locationFetch(query);
    } else {
        locations = getItemFromLocalStore("locations", {});
        if (locations.latestLocation) {
            let tempQuery = JSON.parse(JSON.stringify(query));
            tempQuery.limit = 1;
            let latest = await locationFetch(tempQuery);
            if (latest[0].location_id !== locations.latestLocation) {
                locations = await handleSaveAfterFetch(query);
            } else {
                locations = locations.locationData;
            }
        } else {
            locations = await handleSaveAfterFetch(query);
        }
    }

    let type;
    if (accepted) {
        type = FETCH_LOCATIONS;
    } else {
        type = FETCH_NON_ACCEPTED;
    }

    dispatch({
        type: type,
        payload: locations
    })

}


export const postFormData = (data, images, t) => (dispatch) => {
    return new Promise(function (resolve, reject) {
        let stringifiedData = JSON.stringify(data);
        const formData = new FormData();
        if (images.length > 0) {
            for (let i = 0; i < images.length; ++i) {
                formData.append('image', images[i]);
            }
        }
        formData.append("object", JSON.stringify(data));
        //let formArray = [data, formData];
        //formData.append('object', data);
        axios.post(
            _API_PATH_ + "/Triplocations/addNewLocation", formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

        ).then(async response => {
            let resData = response.data;
            if (response.status === 200 && images.length !== 0) {

                // for (let i = 0; i < images.length; ++i) {
                //     const formData = new FormData()
                //     formData.append('image', images[i]);
                //     try {
                //         await axios.post(_API_PATH_ + "/Images/" + resData + "/upload", formData, {
                //             headers: {
                //                 'content-type': 'multipart/form-data'
                //             }
                //         })
                //     } catch (error) {
                //         console.error(error)
                //     }

                // }

            }
            resolve(true)
            window.alert(t("main.triplocation_success"))

        }).catch(error => {
            console.error(error);
            window.alert(t("main.triplocation_fail"))
            reject(false)
        });
    })
}
export const postEditData = (data, images) => (dispatch, getState) => {
    let user = getUser();
    let accessToken = user.id;
    let userName = user.user.username
    accessToken = "access_token=" + accessToken;
    data.location_editor = userName
    axios.patch(
        _API_PATH_ + "/Triplocations/editLocation?" + accessToken, data

    ).then(async response => {
        if (images.length > 0) {
            for (let i = 0; i < images.length; ++i) {
                const formData = new FormData();
                formData.append('image', images[i]);

                await axios.post(_API_PATH_ + "/Images/" + data.location_id + "/upload?" + accessToken, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })

            }

        }
        window.alert("Retkipaikan muokkaus onnistui")
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));

    }).catch(error => {
        window.alert("Retkipaikan muokkaus epäonnistui")
        console.error(error);
    });
}

export const removeEditImages = (id, imgArr) => async (dispatch, getState) => {
    let accessToken = getUser().id;
    accessToken = "?access_token=" + accessToken;
    for (let i = 0; i < imgArr.length; ++i) {
        try {
            await axios.delete(_API_PATH_ + "/Images/" + id + "/files/" + imgArr[i] + accessToken)
        } catch (error) {
            console.error(error)
        }
    }

}

export const deleteLocation = (data) => (dispatch, getState) => {
    let accessToken = getUser().id;
    let stringifiedData = JSON.stringify(data);
    axios.delete(
        _API_PATH_ + "/Triplocations/deleteLocation?locationData=" + stringifiedData + "&access_token=" + accessToken
    ).then(async response => {
        await axios.delete(_API_PATH_ + "/Images/" + data.location_id + "?access_token=" + accessToken);
        window.alert("Retkipaikan poisto onnistui");
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));
    }).catch(error => {
        console.error(error);
    });
}

export const createFilter = (filters, limitedFields = true) => async (dispatch) => {
    let locations = filters.locationFilters;
    let regionFilters = locations.filter(loc => !loc.municipality_id);
    let municipalityFilters = locations.filter(loc => loc.municipality_id);
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;
    let temp = {
        commonFilters: filters.commonFilters,
        locationFilters: filters.locationFilters,
        locationTypeFilters: filters.locationTypeFilters
    }
    dispatch({
        type: PREVIOUS_FILTER,
        payload: temp
    })
    const filter = {
        filters: regulars.map(r => r.filter_id),
        categories: types.map(t => t.category_id),
        municipalities: municipalityFilters.map(m => m.municipality_id),
        regions: regionFilters.map(r => r.region_id),
        limitedFields: limitedFields
    }
    dispatch(setLoading(true));
    let res = await axios.get(_API_PATH_ + "/Triplocations/handleFiltering?data=" + JSON.stringify(filter));
    if (res.data) {
        res = res.data;
    } else {
        res = []
    }
    dispatch({
        type: UPDATE_RESULTS,
        payload: res
    })
    dispatch(setLoading(false));
}

export const filterFromResults = (searchResults, filters) => async (dispatch) => {
    // filter the searchresults if user added filters
    let locations = filters.locationFilters;
    let regionFilters = locations.filter(loc => !loc.municipality_id);
    let municipalityFilters = locations.filter(loc => loc.municipality_id);
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;
    let temp = {
        commonFilters: filters.commonFilters,
        locationFilters: filters.locationFilters,
        locationTypeFilters: filters.locationTypeFilters
    }
    dispatch({
        type: PREVIOUS_FILTER,
        payload: temp
    })
    //first check regions if arr has items

    let regionsPass = searchResults;
    if (regionFilters.length !== 0) {
        regionsPass = searchResults.filter(loc => regionFilters.find(tag => loc.location_region === tag.object_name));
    }

    //then check municipalities if arr has items
    let municipalitiesPass = regionsPass;
    if (municipalityFilters.length !== 0) {
        municipalitiesPass = regionsPass.filter(loc => municipalityFilters.find(tag => loc.location_municipality === tag.object_name));
    }

    // then filter locations that passed the previous filtering (city filters) if types has items
    let typeFiltersPass = municipalitiesPass;
    if (types.length !== 0) {
        typeFiltersPass = municipalitiesPass.filter(loc => types.find(({ category_id }) => loc.location_category === category_id))
    }


    // then filter the filter array of location object if regulars has items
    let regularFiltersPass = typeFiltersPass
    if (regulars.length !== 0) {
        regularFiltersPass = typeFiltersPass.filter(loc => {
            let locationHas = loc.filters;
            if (regulars.filter(reg => locationHas.includes(reg.filter_id)).length === regulars.length) {
                return loc;
            }
        });
    }


    dispatch({
        type: UPDATE_RESULTS,
        payload: regularFiltersPass
    })


}


