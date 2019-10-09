import { combineReducers } from "redux"
import FilterReducer from "./FilterReducer"
import LoginReducer from "./LoginReducer"
import SearchResultsReducer from "./SearchResultsReducer";

export default combineReducers({
    filters: FilterReducer,
    searchResults: SearchResultsReducer,
    login: LoginReducer
})