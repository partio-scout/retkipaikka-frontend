import { combineReducers } from "redux"
import GeneralReducer from "./GeneralReducer"
import FilterReducer from "./FilterReducer"
import LoginReducer from "./LoginReducer"
import SearchResultsReducer from "./SearchResultsReducer";
import MapReducer from "./MapReducer";


export default combineReducers({
    filters: FilterReducer,
    searchResults: SearchResultsReducer,
    login: LoginReducer,
    map: MapReducer,
    general: GeneralReducer
})