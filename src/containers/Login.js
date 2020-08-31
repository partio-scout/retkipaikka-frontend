import React, { useState } from "react";
import "./styles/main.css";
import Header from "../components/header"
import TextInput from "../components/locationform/textInput";
import { login } from "../actions/LoginActions";
import { connect } from "react-redux";



const Login = (props) => {
    const { t, location, history } = props;
    const [state, setState] = useState({})


    const handleFormSubmit = async (e) => {

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

        let dataObj = { email: state.location_email, password: state.location_password }
        console.log(dataObj)
        let loginStatus = await login(dataObj);

        if (loginStatus) {
            redirect()
        }

    }

    const redirect = () => {
        if (location.state) {
            if (location.state.from) {
                history.push(location.state.from.pathname)

            }
        }
        console.log(props);
    }

    const handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({ ...state, [e.target.id]: value });
        console.log(state)
    }



    const getLoginForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={handleChange} id="location_email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={handleChange} id="location_password" placeholder="Salasana" helper="Kirjoita salasanasi" text="Salasana" customType="password" required={true} />
                    <button onClick={handleFormSubmit} type="submit" className="btn btn-primary">Kirjaudu</button>
                </form>
            </div>
        )
    }



    return (
        <div className="frontpage-container">
            <Header t={t} location={location} />
            {getLoginForm()}
        </div>
    )

}

export default Login