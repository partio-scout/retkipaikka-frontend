import React from "react";
import "./styles/main.css";
import Header from "../components/header"
import TextInput from "../components/locationform/textInput";
import AdminPanel from "../components/admin/AdminPanel"
import LocationList from "../components/admin/LocationList"
import FilterHandler from "../components/admin/FilterHandler";
import { fetchLocations } from "../actions/SearchResultsActions"
import { fetchFilters } from "../actions/FilterActions"
import { connect } from "react-redux";


class Admin extends React.Component {
    state = {
        element: "locations"
    }
    componentWillMount() {
        const { fetchLocations, fetchFilters, results, filtersLoc, filtersCom } = this.props;
        if (results.searchResults.length === 0) {
            fetchLocations();
        }
        if (filtersLoc.length === 0 || filtersCom.length === 0) {
            fetchFilters();
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let emptyFound = false;
        var forms = document.getElementsByClassName('needs-validation');

        Array.prototype.filter.call(forms, function (form) {
            if (form.checkValidity() === false) {
                e.stopPropagation();
                emptyFound = true;
            }
            form.classList.add('was-validated');
        })
        if (emptyFound) {
            return;
        }
    }

    handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({ [e.target.id]: value });
    }



    getLoginForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={this.handleChange} id="location_email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={this.handleChange} id="location_password" placeholder="Salasana" helper="Kirjoita salasanasi" text="Salasana" customType="password" required={true} />
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Kirjaudu</button>
                </form>
            </div>
        )
    }
    handleMenuClick = (e) => {
        let type = e.target.id;
        if (type) {
            this.setState({ element: type })
        }
    }
    getAdminPanel = () => {
        const { element } = this.state;
        let renderElement = "";
        switch (element) {
            case "locations":
            case "notifications":
                renderElement = <LocationList type={element} />
                break;
            case "filters":
                renderElement = <FilterHandler />
                break;
            default:
                renderElement = <h3>Testi</h3>
                break;
        }


        return (
            <div>
                <AdminPanel selectedTab={element} handleClick={this.handleMenuClick} />
                <div className="admin-data-container">
                    {renderElement}
                </div>

                {/* <iframe width="100%" height="800" src="http://localhost:3000/" frameborder="0" allowfullscreen></iframe> */}
            </div>
        )
    }
    render() {
        let loggedIn = true;
        let renderElement = loggedIn ? this.getAdminPanel() : this.getLoginForm();
        return (
            <div className="frontpage-container">
                <Header location={this.props.location} />
                {renderElement}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        results: state.searchResults,
        filtersLoc: state.filters.locationTypeFilterList,
        filtersCom: state.filters.commonFilterList
    }
}
export default connect(mapStateToProps, { fetchLocations, fetchFilters })(Admin);