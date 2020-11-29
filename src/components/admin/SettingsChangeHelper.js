import React, { useState } from "react";
import { getUser, changePassword, superRoleIds, modifyOwnSettings, logOut, fetchSingleUser } from "../../helpers/UserHelper"
import TextInput from "../shared/TextInput"
import { askForConfirmation, clearFormByClassName, useDynamicState } from "../../helpers/Helpers"


const SettingsChangeHelper = (props) => {
    const { t } = props;
    const { state, handleChange } = useDynamicState();
    const user = getUser();

    const passwordFunc = async (data) => {
        await changePassword(data);
        await fetchSingleUser();
        logOut()
    }
    const modifyFunc = async (data) => {
        await modifyOwnSettings(data);
        await fetchSingleUser();
    }
    const handlePost = (e, type) => {
        e.preventDefault();
        switch (type) {
            case "password":
                let dataObject = { newPassword: state.newPassword, oldPassword: state.oldPassword }
                askForConfirmation("Haluatko vaihtaa salasanan?", "Salasanan vaihto", () => passwordFunc(dataObject), false)
                clearFormByClassName("form-control", "password-form")
                break;
            case "username_email":
                let userDataObject = { admin_id: user.userId }
                if (state.email) userDataObject.email = state.email;
                if (state.username) userDataObject.username = state.username;
                askForConfirmation("Haluatko tallentaa muuttuneet tiedot?", "Tietojen muutto", () => modifyFunc(userDataObject), false)
                break;
        }

    }
    const userInfo = () => {
        // email
        // amount of locations accepted, deleted
        return (<div className="user_info_container">
            <h3>{t("settings.user_settings_title")}</h3>
            <div>
                <h4>{t("settings.created")}:</h4>
                <span>{user.created}</span>
                <br />
                {user.user.roles &&
                    <>
                        <h4>{t("settings.role")}:</h4>
                        <span> {user.user.roles[0]?.name}</span>
                        <br />
                    </>}
                <h4>{t("settings.username_email")}:</h4>
                <form id="user-data-form" onSubmit={(e) => handlePost(e, "username_email")} >
                    <div className="form-row">
                        <TextInput maxLength={64} defaultValue={user.user.email} handleChange={handleChange} id="email" placeholder="" helper="" text="Sähköposti" size="col-md-6" required={true} />
                        <TextInput maxLength={64} defaultValue={user.user.username} handleChange={handleChange} id="username" placeholder="" helper="" text="Käyttäjänimi" size="col-md-6" required={true} />
                        <button disabled={!state.email && !state.username} className="btn btn-primary">{t("admin.save")}</button>
                    </div>
                </form>



            </div>

        </div>)
    }



    const passwordChange = () => {
        //  two forms and a button, current pw, new pw, accept
        return (<div className="password_change_container">
            <h3>{t("settings.password_title")}</h3>
            <form id="password-form" onSubmit={(e) => handlePost(e, "password")} >
                <div className="form-row">
                    <TextInput maxLength={64} handleChange={handleChange} id="oldPassword" placeholder="" helper="Kirjoita tämänhetkinen salanasi*" text="Vanha salasana" size="col-md-6" required={true} customType="password" />
                    <TextInput maxLength={64} handleChange={handleChange} id="newPassword" placeholder="" helper="Kirjoita uusi salasana*" text="Uusi salasanaa" size="col-md-6" required={true} customType="password" />
                    <button disabled={!state.oldPassword && !state.newPassword} className="btn btn-primary">{t("admin.save")}</button>
                </div>
            </form>

        </div>)
    }

    return (
        <>
            { userInfo()}
            { passwordChange()}
        </>
    )
}

export default SettingsChangeHelper;