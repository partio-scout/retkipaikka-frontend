
import {
    FETCH_LOCATIONS,
    UPDATE_RESULTS
} from "./ActionTypes"



export const fetchLocations = () => {
    let locations = [{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, description: "laavu jossain", propertyType: "Laavu", has: ["Järvi lähellä"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
    { type: "city", name: "Testikämppä", text: "Helsinki", geo: { lat: 60.16, lng: 24.94 }, propertyType: "Kämppä", description: "laavu jossain2", has: ["Järvi lähellä", "Sisämajoitus", "Sisävessa"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
    { type: "city", name: "Testialue", text: "Turku", geo: { lat: 60.45, lng: 22.26 }, propertyType: "Alue", description: "laavu jossain3", has: ["Järvi lähellä", "Sauna"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
    { type: "city", name: "Testilaavu2", text: "Tampere", geo: { lat: 61.27, lng: 23.51 }, propertyType: "Laavu", description: "laavu jossain4", has: ["Järvi lähellä"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
    { type: "city", name: "Testilaavu2", text: "Hämeenlinnna", geo: { lat: 60.99, lng: 24.46 }, propertyType: "Laavu", description: "laavu jossain5", has: ["Järvi lähellä"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
    { type: "city", name: "Laituri", text: "Säkylä", geo: { lat: 61.04, lng: 22.32 }, propertyType: "Venelaituri", description: "Venelaituri1", has: ["Järvi lähellä", "Laituri"], data: { ownerName: "Meri", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } }]

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


