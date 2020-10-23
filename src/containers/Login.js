import React, { useState } from "react";
import "./styles/main.css";
import Header from "../components/header"
import TextInput from "../components/locationform/textInput";
import { login, register } from "../actions/LoginActions";
import { connect } from "react-redux";



const Login = (props) => {
    const { t, location, history } = props;
    const [state, setState] = useState({})
    const [registerForm, setRegisterForm] = useState(false);

    const validate = (e) => {
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
            return false;
        }
        return true;
    }
    const handleFormSubmit = async (e, isLogin) => {

        if (!validate(e)) {
            return
        }
        if (isLogin) {
            let dataObj = { email: state.location_email, password: state.location_password }
            console.log(dataObj)
            let loginStatus = await login(dataObj);

            if (loginStatus) {
                redirect()
            }
        } else {
            let dataObj = { email: state.location_email, password: state.location_password, username: state.location_username }
            let registerStatus = await register(dataObj);

            if (registerStatus) {
                redirect()
            }

        }


    }

    const redirect = () => {
        console.log(location.state)
        if (location.state) {
            if (location.state.from) {
                console.log("in here ", location.state.from.pathname)
                history.push(location.state.from.pathname)

            }
        } else {
            history.push("/");
        }
        console.log(props);
    }

    const handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({ ...state, [e.target.id]: value });
        console.log(state)
    }

    const getRegisterForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={handleChange} id="location_email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={handleChange} id="location_username" placeholder="Käyttäjänimi" helper="Kirjoita käyttäjänimesi" text="Käyttäjänimi" required={true} />
                    <TextInput handleChange={handleChange} id="location_password" placeholder="Salasana" helper="Kirjoita salasana" text="Salasana" customType="password" required={true} />
                    <button onClick={(e) => handleFormSubmit(e, false)} type="submit" className="btn btn-primary">{t("main.register_button")}</button>
                    <div>{t("main.register_text")}</div>
                </form>
                <div onClick={() => setRegisterForm(false)} className="login-register-text">{t("main.login")}</div>
            </div>

        )
    }
    const getLoginForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={handleChange} id="location_email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={handleChange} id="location_password" placeholder="Salasana" helper="Kirjoita salasanasi" text="Salasana" customType="password" required={true} />
                    <button onClick={(e) => handleFormSubmit(e, true)} type="submit" className="btn btn-primary">{t("main.login")}</button>
                </form>
                <div onClick={() => setRegisterForm(true)} className="login-register-text">{t("main.register")}</div>
            </div>

        )
    }



    return (
        <div className="frontpage-container">
            <Header t={t} location={location} />
            {registerForm ? getRegisterForm() : getLoginForm()}
        </div>
    )

}

export default Login