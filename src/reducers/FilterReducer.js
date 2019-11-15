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

} from "../actions/ActionTypes"

const initialState = {
    locationFilters: [],
    locationTypeFilters: [],
    commonFilters: [],
    locationTypeFilterList: [],
    commonFilterList: []
}

const handleDelete = (filter, removeObj) => {
    let newArr = [...filter];
    newArr = newArr.filter(filterObj => filterObj.object_name !== removeObj.object_name);
    return newArr;

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LOCATION_FILTER:
            return {
                ...state,
                locationFilters: [...state.locationFilters, action.payload]
            }
        case REMOVE_LOCATION_FILTER:
            return {
                ...state,
                locationFilters: handleDelete(state.locationFilters, action.payload)
            }
        case ADD_LOCATIONTYPE_FILTER:
            return {
                ...state,
                locationTypeFilters: [...state.locationTypeFilters, action.payload]
            }
        case REMOVE_LOCATIONTYPE_FILTER:
            return {
                ...state,
                locationTypeFilters: handleDelete(state.locationTypeFilters, action.payload)
            }
        case ADD_COMMON_FILTER:
            return {
                ...state,
                commonFilters: [...state.commonFilters, action.payload]
            }
        case REMOVE_COMMON_FILTER:
            return {
                ...state,
                commonFilters: handleDelete(state.commonFilters, action.payload)
            }
        case REMOVE_ALL_COMMON_FILTERS:
            return {
                ...state,
                commonFilters: []
            }
        case REMOVE_ALL_LOCATIONTYPE_FILTERS:
            return {
                ...state,
                locationTypeFilters: []
            }
        case UPDATE_FETCHED_FILTERS:
            return {
                ...state,
                locationTypeFilterList: action.payload.locations,
                commonFilterList: action.payload.common
            }
        default:
            return state;
    }
}