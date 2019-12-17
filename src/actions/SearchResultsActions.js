
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS,
    FETCH_NON_ACCEPTED
} from "./ActionTypes"



import axios from "axios";



export const fetchLocations = (accepted) => async (dispatch) => {
    // fetch locations from database

    let locations = [];
    let query = {
        where: {
            location_accepted: accepted
        }
    }
    try {
        locations = await axios.get(_API_PATH_ + "/Triplocations/fetchLocations?filter=" + JSON.stringify(query));
        locations = locations.data;
    } catch (error) {
        console.error(error);
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

export const postFormData = (data, images) => (dispatch) => {
    return new Promise(function (resolve, reject) {
        let stringifiedData = JSON.stringify(data);
        console.log(stringifiedData);
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
            console.log(response.data, "in post data");
            let resData = response.data;
            console.log(response);
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
            window.alert("Retkipaikka ilmoitettu")

        }).catch(error => {
            console.error(error);
            window.alert("Virhe retkipaikan lisäämisessä")
            reject(false)
        });
    })
}
export const postEditData = (data, images) => (dispatch, getState) => {
    let accessToken = getState().login.accessToken;
    accessToken = "access_token=" + accessToken;

    console.log("in edit")
    let stringifiedData = JSON.stringify(data);
    //console.log(stringifiedData);
    //console.log(JSON.parse(stringifiedData), "in edit post")
    //console.log(_API_PATH_ + "/Triplocations/editLocation?locationData=" + stringifiedData + accessToken)
    console.log(_API_PATH_ + "/Triplocations/editLocation?" + accessToken, data);
    axios.patch(
        _API_PATH_ + "/Triplocations/editLocation?" + accessToken, data

    ).then(async response => {
        console.log(response, "edit res");
        if (images.length > 0) {
            for (let i = 0; i < images.length; ++i) {
                const formData = new FormData();
                formData.append('image', images[i]);
                try {
                    await axios.post(_API_PATH_ + "/Images/" + data.location_id + "/upload?" + accessToken, formData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                } catch (error) {
                    console.error(error)
                }
            }


        }
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));

    }).catch(error => {
        console.log("error in editing data", error);
    });
}

export const removeEditImages = (id, imgArr) => async (dispatch, getState) => {
    let accessToken = getState().login.accessToken;
    accessToken = "&access_token=" + accessToken;
    for (let i = 0; i < imgArr.length; ++i) {
        try {
            await axios.delete(_API_PATH_ + "/Images/" + id + "/files/" + imgArr[i] + accessToken)
        } catch (error) {
            console.error(error)
        }
    }

}

export const deleteLocation = (data) => (dispatch, getState) => {
    let accessToken = getState().login.accessToken;
    let stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);
    axios.delete(
        _API_PATH_ + "/Triplocations/deleteLocation?locationData=" + stringifiedData + "&access_token=" + accessToken
    ).then(async response => {
        await axios.delete(_API_PATH_ + "/Images/" + data.location_id + "?access_token=" + accessToken);
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));
    }).catch(error => {
        console.log("error in editing data", error);
    });
}



export const filterFromResults = (searchResults, filters) => {
    // filter the searchresults if user added filters
    let locations = filters.locationFilters;
    let regionFilters = locations.filter(loc => !loc.municipality_id);
    let municipalityFilters = locations.filter(loc => loc.municipality_id);
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;

    //first check regions if arr has items
    console.log(regionFilters, municipalityFilters)
    let regionsPass = searchResults;
    if (regionFilters.length !== 0) {
        regionsPass = searchResults.filter(loc => regionFilters.find(tag => loc.location_region === tag.object_name));
    }
    console.log(regionsPass.length, " passed regionfilters");
    //then check municipalities if arr has items
    let municipalitiesPass = regionsPass;
    if (municipalityFilters.length !== 0) {
        municipalitiesPass = regionsPass.filter(loc => municipalityFilters.find(tag => loc.location_municipality === tag.object_name));
    }
    console.log(municipalitiesPass.length, " passed municipalities");
    // then filter locations that passed the previous filtering (city filters) if types has items
    let typeFiltersPass = municipalitiesPass;
    if (types.length !== 0) {
        typeFiltersPass = municipalitiesPass.filter(loc => types.find(({ object_name }) => loc.location_category === object_name))
    }

    console.log(typeFiltersPass.length, " passed typefilters");
    // then filter the filter array of location object if regulars has items
    let regularFiltersPass = typeFiltersPass
    if (regulars.length !== 0) {
        regularFiltersPass = typeFiltersPass.filter(loc => {
            let locationHas = loc.filters;
            if (regulars.filter(reg => locationHas.includes(reg.object_name)).length === regulars.length) {
                return loc;
            }
        });
    }
    console.log(regularFiltersPass.length, " passed regularfilters");


    return {
        type: UPDATE_RESULTS,
        payload: regularFiltersPass
    }

}


