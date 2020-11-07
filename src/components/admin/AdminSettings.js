import React, { useState } from "react";
import { getUser, changePassword, superRoleIds, modifyOwnSettings, checkRoleValidity } from "../../helpers/UserHelper"
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import AdminTable from "../shared/AdminTable"
import { askForConfirmation, clearFormByClassName, useDynamicState } from "../../helpers/Helpers"
import RegionNotifications from "./RegionNotifications"
import moment from "moment"
import InfoDialog from "./dialogs/InfoDialog"
import UserEditDialog from "./dialogs/UserEditDialog"
import { useAdminContext } from "../../context/AdminContext"
const AdminSettings = ({ t }) => {
    // regular admin settings
    const { state, handleChange } = useDynamicState();
    const user = getUser();
    const [clickedObj, setClickedObj] = useState(null)
    const { currentUsers, newUsers } = useAdminContext();


    const regionNotifications = () => {

        // three options: none, all, selected regions
        // accept button 
        let userNoti = user?.user?.notifications;
        let userRegions = user?.user?.regions;

        return (<div className="notification_container">
            <RegionNotifications t={t} userNotification={userNoti} regions={userRegions} />
        </div>)
    }
    const handlePost = (e, type) => {
        e.preventDefault();
        switch (type) {
            case "password":
                let dataObject = { newPassword: state.newPassword, oldPassword: state.oldPassword }
                askForConfirmation("Haluatko vaihtaa salasanan?", "Salasanan vaihto", () => changePassword(dataObject), false)
                clearFormByClassName("form-control", "password-form")
                break;
            case "username_email":
                let userDataObject = { admin_id: user.userId }
                if (state.email) userDataObject.email = state.email;
                if (state.username) userDataObject.username = state.username;
                askForConfirmation("Haluatko tallentaa muuttuneet tiedot?", "Tietojen muutto", () => modifyOwnSettings(userDataObject), false)
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
                    <button disabled={!state.email && !state.username} className="btn btn-primary">{t("admin.save")}</button>
                </div>
            </form>

        </div>)
    }


    const userRows = (obj) => {
        return (
            <tr key={obj.admin_id} onClick={(e) => setClickedObj(obj)}>
                <th scope="row">{obj.admin_id}</th>
                <td>{obj.email}</td>
                <td>{t("settings.regions_" + obj.notifications)}</td>
                <td>{obj.username}</td>
            </tr>
        )

    }


    const userEntries = () => {
        return [
            { id: "admin_id", t: "id" },
            { id: "email", t: "settings.email" },
            { id: "notifications", t: "settings.notifications_table" },
            { id: "username", t: "settings.username" },
        ]
    }

    // settings for super admin
    const listAllUsers = () => {

        return (<div className="user-table-container">
            <h3>
                {t("settings.current_users")}
            </h3>
            <AdminTable t={t} getRowData={userRows} objEntries={userEntries()} data={currentUsers}></AdminTable>
        </div>)

    }
    const newUserNotifications = () => {
        return (<div className="user-table-container">
            <h3>
                {t("settings.new_users")}
            </h3>
            <AdminTable t={t} getRowData={userRows} objEntries={userEntries()} data={newUsers}></AdminTable>
        </div>)

    }
    const closeDialog = () => {
        setClickedObj(null);
    }
    const listUsers = () => {
        if (checkRoleValidity(user)) {
            return (
                <>
                    {listAllUsers()}
                    {newUserNotifications()}
                </>
            )
        }
    }
    return (
        <div className="admin-content-container">
            {regionNotifications()}
            {userInfo()}
            {passwordChange()}
            {listUsers()}
            {clickedObj !== null &&
                <InfoDialog open={clickedObj !== null} dialogTitle={t("settings.user_edit")} handleClose={closeDialog} maxWidth={"sm"} dialogInfoText={t("settings.userdialog_info")}>
                    <UserEditDialog
                        t={t}
                        data={clickedObj}
                        handleClose={closeDialog}
                    />
                </InfoDialog>
            }







        </div >


    )

}
AdminSettings.defaultProps = {
    t: () => { }
}

export default AdminSettings;