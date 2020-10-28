import React, { useState } from "react";
import { getUser, changePassword } from "../../helpers/UserHelper"
import TextInput from "../locationform/textInput"
import { askForConfirmation, clearFormByClassName } from "../../helpers/Helpers"

const AdminSettings = ({ handleClick, selectedTab, t }) => {
    // regular admin settings
    const [state, setState] = useState({})
    const user = getUser();
    //const currentUsers = 
    //const notificationUsers

    const regionNotifications = () => {


        // three options: none, all, selected regions
        // accept button 
        return (<div>
            region notification
        </div>)
    }
    const handlePost = (e, type) => {
        e.preventDefault();
        switch (type) {
            case "password":
                let dataObject = { newPassword: state.newPassword, oldPassword: state.oldPassword }
                askForConfirmation("Haluatko vaihtaa salasanan?", "Salasanan vaihto", () => changePassword(dataObject), false)
                clearFormByClassName("form-control")
                break;
        }

    }
    const userInfo = () => {
        // email
        // amount of locations accepted, deleted
        console.log(user, "IN USER")
        return (<div className="user_info_container">
            <h3>{t("settings.user_settings_title")}</h3>
            <div>
                <h4>{t("settings.created")}:</h4>
                <span>{user.created}</span>
                <br />
                <h4>{t("settings.email")}:</h4>
                <span> {user.user.email}</span>
                <br />
            </div>

        </div>)
    }
    const handleChange = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({ ...state, [e.target.id]: value });

    }

    const passwordChange = () => {
        //  two forms and a button, current pw, new pw, accept
        return (<div>
            <form onSubmit={(e) => handlePost(e, "password")} >
                <div className="form-row">
                    <TextInput maxLength={64} handleChange={handleChange} id="oldPassword" placeholder="" helper="Kirjoita tämänhetkinen salanasi*" text="Vanha salasana" size="col-md-6" required={true} customType="password" />
                    <TextInput maxLength={64} handleChange={handleChange} id="newPassword" placeholder="" helper="Kirjoita uusi salasana*" text="Uusi salasanaa" size="col-md-6" required={true} customType="password" />
                    <button className="btn btn-primary">{t("admin.save")}</button>
                </div>
            </form>

        </div>)
    }
    // settings for super admin
    const listAllUsers = () => {
        return (<div>
            list users
        </div>)

    }
    const newUserNotifications = () => {
        return (<div>
            new user notification
        </div>)

    }


    return (
        <div className="admin-settings-container">
            {regionNotifications()}
            {userInfo()}
            {passwordChange()}
            {listAllUsers()}
            {newUserNotifications()}


        </div>


    )

}

export default AdminSettings;