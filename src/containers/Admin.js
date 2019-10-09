import React from "react";
import "./styles/main.css";
import Header from "../components/header"
import TextInput from "../components/locationform/textInput";
import { connect } from "react-redux";


class Admin extends React.Component {
    state = {

    }
    componentWillMount() {
        console.log("login mounted")
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
                    <TextInput handleChange={this.handleChange} id="email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={this.handleChange} id="password" placeholder="Salasana" helper="Kirjoita salasanasi" text="Salasana" customType="password" required={true} />
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Kirjaudu</button>
                </form>
            </div>
        )
    }
    getAdminPanel = () => {
        return (
            <div>
                paneeli
            </div>
        )
    }
    render() {
        let loggedIn = false;
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
        results: state.searchResults
    }
}
export default connect(mapStateToProps)(Admin);