import { combineReducers } from "redux"
import GeneralReducer from "./GeneralReducer"
import FilterReducer from "./FilterReducer"
import SearchResultsReducer from "./SearchResultsReducer";
import MapReducer from "./MapReducer";


export default combineReducers({
    filters: FilterReducer,
    searchResults: SearchResultsReducer,
    map: MapReducer,
    general: GeneralReducer
})