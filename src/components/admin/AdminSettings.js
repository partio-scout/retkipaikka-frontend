import React, { useState } from "react";
import { getUser, changePassword, useUserData } from "../../helpers/UserHelper"
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import AdminTable from "../shared/AdminTable"
import { askForConfirmation, clearFormByClassName, useDynamicState } from "../../helpers/Helpers"
import RegionNotifications from "./RegionNotifications"
import moment from "moment"
import InfoDialog from "./dialogs/InfoDialog"
import UserEditDialog from "./dialogs/UserEditDialog"
const AdminSettings = ({ t, currentUsers, newUsers, allRoles }) => {
    // regular admin settings
    const { state, handleChange } = useDynamicState();
    const user = getUser();
    const [clickedObj, setClickedObj] = useState(null)



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
                <h4>{t("settings.username")}:</h4>
                <span> {user.user.username}</span>
                <br />
                <h4>{t("settings.role")}:</h4>
                <span> {user.user?.roles[0]?.name}</span>
                <br />
            </div>

        </div>)
    }



    const passwordChange = () => {
        //  two forms and a button, current pw, new pw, accept
        return (<div className="password_change_container">
            <h3>{t("settings.password_title")}</h3>
            <form onSubmit={(e) => handlePost(e, "password")} >
                <div className="form-row">
                    <TextInput maxLength={64} handleChange={handleChange} id="oldPassword" placeholder="" helper="Kirjoita tämänhetkinen salanasi*" text="Vanha salasana" size="col-md-6" required={true} customType="password" />
                    <TextInput maxLength={64} handleChange={handleChange} id="newPassword" placeholder="" helper="Kirjoita uusi salasana*" text="Uusi salasanaa" size="col-md-6" required={true} customType="password" />
                    <button className="btn btn-primary">{t("admin.save")}</button>
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

    return (
        <div className="admin-settings-container">
            {regionNotifications()}
            {userInfo()}
            {passwordChange()}
            {listAllUsers()}
            {newUserNotifications()}
            {clickedObj !== null &&
                <InfoDialog open={clickedObj !== null} dialogTitle={t("settings.user_edit")} handleClose={closeDialog} maxWidth={"sm"}>
                    <UserEditDialog
                        t={t}
                        data={clickedObj}
                        allRoles={allRoles}
                        handleClose={closeDialog}
                    />
                </InfoDialog>
            }







        </div >


    )

}
AdminSettings.defaultProps = {
    t: () => { },
    currentUsers: [],
    newUsers: [],
    allRoles: []
}

export default AdminSettings;