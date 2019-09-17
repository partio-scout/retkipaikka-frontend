
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS
} from "./ActionTypes"



export const fetchLocations = () => {
    let locations = [{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, propertyType: "Laavu", has: ["Järvi lähellä"], data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    { type: "city", name: "Testikämppä", text: "Helsinki", geo: { lat: 60.16, lng: 24.94 }, propertyType: "Kämppä", has: ["Järvi lähellä", "Sisämajoitus", "Sisävessa"], data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    { type: "city", name: "Testialue", text: "Turku", geo: { lat: 60.45, lng: 22.26 }, propertyType: "Alue", has: ["Järvi lähellä", "Sauna"], data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    { type: "city", name: "Testilaavu2", text: "Tampere", geo: { lat: 61.27, lng: 23.51 }, propertyType: "Laavu", has: ["Järvi lähellä"], data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    { type: "city", name: "Testilaavu2", text: "Hämeenlinnna", geo: { lat: 60.99, lng: 24.46 }, propertyType: "Laavu", has: ["Järvi lähellä"], data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } }]
    return {
        type: FETCH_LOCATIONS,
        payload: locations
    }
}



export const filterFromResults = (searchResults, filters) => {
    // locationFilters: [],
    // locationTypeFilters: [],
    // commonFilters: [],
    console.log(filters);
    console.log(searchResults);
    //{ type: "city", name: "Testikämppä", text: "Helsinki", geo: { lat: 61.16, lng: 24.94 }, propertyType: "Kämppä", has: ["Järvi lähellä", "Sisämajoitus", "Sisävessa"] },
    let locations = filters.locationFilters;
    let types = filters.locationTypeFilters;
    let regulars = filters.commonFilters;
    let cityFiltersPass = searchResults.filter(loc => locations.find(({ text }) => loc.text === text));
    cityFiltersPass = locations.length === 0 ? searchResults : cityFiltersPass;
    console.log(cityFiltersPass.length, " passed cityfilters");

    let typeFiltersPass = cityFiltersPass.filter(loc => types.find(({ text }) => loc.propertyType === text))
    typeFiltersPass = types.length === 0 ? cityFiltersPass : typeFiltersPass;
    console.log(typeFiltersPass.length, " passed typefilters");

    let regularFiltersPass = typeFiltersPass.filter(loc => {
        let locationHas = loc.has;
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


