
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS
} from "./ActionTypes"



export const fetchLocations = () => {
    // fetch locations from database
    // currently hardcoded values
    let locations = [{ id: 1, location_type: "city", location_name: "Testilaavu", location_place: "Tampere", location_geo: { lat: 61.29, lng: 23.45 }, location_category: "Laavu", location_description: "laavu jossain", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    { id: 2, location_type: "city", location_name: "Testikämppä", location_place: "Helsinki", location_geo: { lat: 60.16, lng: 24.94 }, location_category: "Kämppä", location_description: "laavu jossain2", filters: ["Järvi lähellä", "Sisämajoitus", "Sisävessa"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    { id: 3, location_type: "city", location_name: "Testialue", location_place: "Turku", location_geo: { lat: 60.45, lng: 22.26 }, location_category: "Alue", location_description: "laavu jossain3", filters: ["Järvi lähellä", "Sauna"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    { id: 4, location_type: "city", location_name: "Testilaavu2", location_place: "Tampere", location_geo: { lat: 61.27, lng: 23.51 }, location_category: "Laavu", location_description: "laavu jossain4", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    { id: 5, location_type: "city", location_name: "Testilaavu2", location_place: "Hämeenlinnna", location_geo: { lat: 60.99, lng: 24.46 }, location_category: "Laavu", location_description: "laavu jossain5", filters: ["Järvi lähellä"], location_owner: "hehu", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" },
    { id: 6, location_type: "city", location_name: "Laituri", location_place: "Säkylä", location_geo: { lat: 61.04, lng: 22.32 }, location_category: "Venelaituri", location_description: "Venelaituri1", filters: ["Järvi lähellä", "Laituri", "Yli 5 majoituspaikkaa"], location_owner: "Meri", location_website: "www.hehu.fi", location_phone: "123034234", location_mail: "oy@partio.com" }]



    return {
        type: FETCH_LOCATIONS,
        payload: locations
    }
}



export const filterFromResults = (searchResults, filters) => {
    // filter the searchresults if user added filters
    let locations = filters.locationFilters;
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;
    // first filter search results through location names
    let cityFiltersPass = searchResults.filter(loc => locations.find(({ text }) => loc.location_place === text));
    // if all passed, dont modify the array
    cityFiltersPass = locations.length === 0 ? searchResults : cityFiltersPass;
    console.log(cityFiltersPass.length, " passed cityfilters");

    // then filter locations that passed the previous filtering (city filters)
    let typeFiltersPass = cityFiltersPass.filter(loc => types.find(({ text }) => loc.location_category === text))
    // if all passed, dont modify the array
    typeFiltersPass = types.length === 0 ? cityFiltersPass : typeFiltersPass;
    console.log(typeFiltersPass.length, " passed typefilters");
    // then filter the filter array of location object
    let regularFiltersPass = typeFiltersPass.filter(loc => {
        let locationHas = loc.filters;
        if (regulars.filter(reg => locationHas.includes(reg.text)).length === regulars.length) {
            return loc;
        }
    });
    console.log(regularFiltersPass.length, " passed regularfilters");


    return {
        type: UPDATE_RESULTS,
        payload: regularFiltersPass
    }



}


