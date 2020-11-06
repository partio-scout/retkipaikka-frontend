import React, { useState } from "react";
import "./styles/main.css";
import Header from "../components/header/Header"
import TextInput from "../components/shared/TextInput";
import TextArea from "../components/shared/TextArea";
import { login, register } from "../helpers/UserHelper";
import { connect } from "react-redux";
import { useDynamicState } from "../helpers/Helpers";
import { useAdminContext } from "../context/AdminContext";





const Login = (props) => {
    const { t, location, history } = props;
    // const [state, setState] = useState({})
    const { state, handleChange } = useDynamicState({})
    const [registerForm, setRegisterForm] = useState(false);
    const { changeLoginStatus } = useAdminContext();
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
        const { email, password, username, description } = state;

        if (!validate(e)) {
            return
        }

        if (isLogin) {
            let dataObj = { email, username: email, password }
            if (email.includes("@")) {
                delete dataObj.username;
            } else {
                delete dataObj.email
            }

            let loginStatus = await login(dataObj);
            if (loginStatus) {
                changeLoginStatus(true);
                redirect()
            }
        } else {
            let dataObj = { email, password, username, description }
            if (email === username) {
                window.alert("Käyttäjänimi ei voi olla sama kuin sähköposti")
                return;
            }
            let registerStatus = await register(dataObj);

            if (registerStatus) {
                redirect()
            }

        }


    }

    const redirect = () => {
        if (location.state) {
            if (location.state.from) {
                history.push(location.state.from.pathname)

            }
        } else {
            history.push("/");
        }
    }


    const getRegisterForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={handleChange} id="email" placeholder="Sähköpostiosoite" helper="Kirjoita sähköpostiosoitteesi" text="Sähköposti" required={true} />
                    <TextInput handleChange={handleChange} id="username" placeholder="Käyttäjänimi" helper="Kirjoita käyttäjänimesi" text="Käyttäjänimi" required={true} />
                    <TextInput handleChange={handleChange} id="password" placeholder="Salasana" helper="Kirjoita salasana" text="Salasana" customType="password" required={true} />
                    <TextArea handleChange={handleChange} id="description" text="Kuvaus itsestä" placeholder="Kuvaus" helper="Kirjoita jotain itsestäsi, jotta ylläpito tietää kuka olet" required={true} />
                    <button onClick={(e) => handleFormSubmit(e, false)} type="submit" className="btn btn-primary">{t("main.register_button")}</button>
                    <div>{t("main.register_text")}</div>
                </form>
                <div onClick={() => setRegisterForm(false)} className="login-register-text">{t("main.login")}</div>
            </div >

        )
    }
    const getLoginForm = () => {
        return (
            <div className="login-form">
                <form className="needs-validation" noValidate>
                    <TextInput handleChange={handleChange} id="email" placeholder="Sähköpostiosoite tai käyttäjänimi" helper="Kirjoita sähköpostiosoite tai käyttäjänimi" text="Kirjautumistunnus" required={true} />
                    <TextInput handleChange={handleChange} id="password" placeholder="Salasana" helper="Kirjoita salasanasi" text="Salasana" customType="password" required={true} />
                    <button onClick={(e) => handleFormSubmit(e, true)} type="submit" className="btn btn-primary">{t("main.login")}</button>
                </form>
                <div onClick={() => setRegisterForm(true)} className="login-register-text">{t("main.register")}</div>
            </div>

        )
    }



    return (
        <div className="frontpage-container">
            {registerForm ? getRegisterForm() : getLoginForm()}
        </div>
    )

}

export default Login