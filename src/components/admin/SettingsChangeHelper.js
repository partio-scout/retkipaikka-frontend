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
                askForConfirmation(t("admin.password_save_text"), t("admin.password_save_title"), () => passwordFunc(dataObject), false)
                clearFormByClassName("form-control", "password-form")
                break;
            case "username_email":
                let userDataObject = { admin_id: user.userId }
                if (state.email) userDataObject.email = state.email;
                if (state.username) userDataObject.username = state.username;
                askForConfirmation(t("admin.email_save_text"), t("admin.email_save_title"), () => modifyFunc(userDataObject), false)
                break;
        }

    }
    const userInfo = () => {
        // email
        // amount of locations accepted, deleted
        return (<div className="user_info_container">
            <h3>{t("admin.user_settings_title")}</h3>
            <div>
                <h4>{t("admin.created")}:</h4>
                <span>{user.created}</span>
                <br />
                {user.user.roles &&
                    <>
                        <h4>{t("admin.role")}:</h4>
                        <span> {user.user.roles[0]?.name}</span>
                        <br />
                    </>}
                <h4>{t("admin.username_email")}:</h4>
                <form id="user-data-form" onSubmit={(e) => handlePost(e, "username_email")} >
                    <div className="form-row">
                        <TextInput maxLength={64} defaultValue={user.user.email} handleChange={handleChange} id="email" placeholder="" helper="" text={t("admin.email")} size="col-md-6" required={true} />
                        <TextInput maxLength={64} defaultValue={user.user.username} handleChange={handleChange} id="username" placeholder="" helper="" text={t("admin.username")} size="col-md-6" required={true} />
                        <button disabled={!state.email && !state.username} className="btn btn-primary">{t("admin.save")}</button>
                    </div>
                </form>



            </div>

        </div>)
    }



    const passwordChange = () => {
        //  two forms and a button, current pw, new pw, accept
        return (<div className="password_change_container">
            <h3>{t("admin.password_title")}</h3>
            <form id="password-form" onSubmit={(e) => handlePost(e, "password")} >
                <div className="form-row">
                    <TextInput maxLength={64} handleChange={handleChange} id="oldPassword" placeholder="" helper={t("admin.current_password_helper")} text={t("admin.current_password")} size="col-md-6" required={true} customType="password" />
                    <TextInput maxLength={64} handleChange={handleChange} id="newPassword" placeholder="" helper={t("admin.new_password_helper")} text={t("admin.new_password")} size="col-md-6" required={true} customType="password" />
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