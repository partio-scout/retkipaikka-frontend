import { combineReducers } from "redux"
import FilterReducer from "./FilterReducer"
import SearchResultsReducer from "./SearchResultsReducer";

export default combineReducers({
    filters: FilterReducer,
    searchResults: SearchResultsReducer
})