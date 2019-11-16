
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS,
    FETCH_NON_ACCEPTED
} from "./ActionTypes"

import axios from "axios";



export const fetchLocations = (accepted) => async (dispatch) => {
    // fetch locations from database
    // currently hardcoded values
    // let locations = [{ location_id: 1, object_type: "city", location_name: "Testilaavu", object_name: "Tampere", location_geo: { lat: 61.29, lng: 23.45 }, location_category: "Laavu", location_description: "laavu jossain", location_pricing: "20€", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    // { location_id: 2, object_type: "city", location_name: "Testikämppä", object_name: "Helsinki", location_geo: { lat: 60.16, lng: 24.94 }, location_category: "Kämppä", location_description: "laavu jossain2", location_pricing: "20€", filters: ["Järvi lähellä", "Sisämajoitus", "Sisävessa"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    // { location_id: 3, object_type: "city", location_name: "Testialue", object_name: "Turku", location_geo: { lat: 60.45, lng: 22.26 }, location_category: "Alue", location_description: "laavu jossain3", location_pricing: "20€", filters: ["Järvi lähellä", "Sauna"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    // { location_id: 4, object_type: "city", location_name: "Testilaavu2", object_name: "Tampere", location_geo: { lat: 61.27, lng: 23.51 }, location_category: "Laavu", location_description: "laavu jossain4", location_pricing: "20€", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    // { location_id: 5, object_type: "city", location_name: "Testilaavu2", object_name: "Hämeenlinnna", location_geo: { lat: 60.99, lng: 24.46 }, location_category: "Laavu", location_description: "laavu jossain5", location_pricing: "20€", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    // { location_id: 6, object_type: "city", location_name: "Laituri", object_name: "Säkylä", location_geo: { lat: 61.04, lng: 22.32 }, location_category: "Venelaituri", location_description: "Venelaituri1", location_pricing: "20€", filters: ["Järvi lähellä", "Laituri", "Yli 5 majoituspaikkaa"], location_owner: "Meri", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" }]

    let locations = [];
    let query = {
        where: {
            location_accepted: accepted
        }
    }
    try {

        locations = await axios.get(`http://localhost:3001/api/Triplocations/fetchlocations?filter=` + JSON.stringify(query));
        locations = locations.data;
        console.log(locations)

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

export const postFormData = (data) => {
    let stringifiedData = JSON.stringify(data);
    axios.post(
        'http://localhost:3001/api/Triplocations/addNewLocation?locationData=' + stringifiedData

    ).then(response => {
        console.log(response);

    }).catch(error => {
        console.log("error in feedback", error);
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


