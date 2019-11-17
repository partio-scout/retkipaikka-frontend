
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
        locations = await axios.get(_API_PATH_ + "/Triplocations/fetchlocations?filter=" + JSON.stringify(query));
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

export const postFormData = (data) => (dispatch) => {
    return new Promise(function (resolve, reject) {
        let stringifiedData = JSON.stringify(data);
        axios.post(
            _API_PATH_ + "/Triplocations/addNewLocation?locationData=" + stringifiedData

        ).then(response => {
            console.log(response);
            resolve(true)
            window.alert("Retkipaikka ilmoitettu")

        }).catch(error => {
            window.alert("Virhe retkipaikan lisäämisessä")
            reject(false)
        });
    })
}

export const postEditData = (data) => (dispatch) => {
    console.log("in edit")
    let stringifiedData = JSON.stringify(data);
    axios.patch(
        _API_PATH_ + "/Triplocations/editLocation?locationData=" + stringifiedData

    ).then(response => {
        console.log(response, "edit res");
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));

    }).catch(error => {
        console.log("error in editing data", error);
    });
}

export const deleteLocation = (data) => (dispatch) => {
    let stringifiedData = JSON.stringify(data);
    console.log(stringifiedData);
    axios.delete(
        _API_PATH_ + "/Triplocations/deleteLocation?locationData=" + stringifiedData
    ).then(response => {
        console.log(response);
        dispatch(fetchLocations(true));
        dispatch(fetchLocations(false));
    }).catch(error => {
        console.log("error in editing data", error);
    });
}



export const filterFromResults = (searchResults, filters) => {
    // filter the searchresults if user added filters
    let locations = filters.locationFilters;
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;
    // first filter search results through location names
    let cityFiltersPass = searchResults.filter(loc => locations.find(({ object_name }) => loc.object_name === object_name));
    // if all passed, dont modify the array
    cityFiltersPass = locations.length === 0 ? searchResults : cityFiltersPass;
    console.log(cityFiltersPass.length, " passed cityfilters");

    // then filter locations that passed the previous filtering (city filters)
    let typeFiltersPass = cityFiltersPass.filter(loc => types.find(({ object_name }) => loc.location_category === object_name))
    // if all passed, dont modify the array
    typeFiltersPass = types.length === 0 ? cityFiltersPass : typeFiltersPass;
    console.log(typeFiltersPass.length, " passed typefilters");
    // then filter the filter array of location object
    let regularFiltersPass = typeFiltersPass.filter(loc => {
        let locationHas = loc.filters;
        if (regulars.filter(reg => locationHas.includes(reg.object_name)).length === regulars.length) {
            return loc;
        }
    });
    console.log(regularFiltersPass.length, " passed regularfilters");


    return {
        type: UPDATE_RESULTS,
        payload: regularFiltersPass
    }



}


