import React, { useState } from "react";
import { getUser, changePassword, superRoleIds, modifyOwnSettings, checkRoleValidity } from "../../helpers/UserHelper"
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import AdminTable from "../shared/AdminTable"
import { askForConfirmation, clearFormByClassName, useDynamicState } from "../../helpers/Helpers"
import RegionNotifications from "./RegionNotifications"
import UserNotifications from "./UserNotifications"
import moment from "moment"
import InfoDialog from "./dialogs/InfoDialog"
import UserEditDialog from "./dialogs/UserEditDialog"
import { useAdminContext } from "../../context/AdminContext"
import SettingsChangeHelper from "./SettingsChangeHelper";
const AdminSettings = ({ t }) => {
    // regular admin settings
    const user = getUser();
    const isAdmin = checkRoleValidity();
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
    const userNotifications = () => {

        // three options: none, all, selected regions
        // accept button 
        if (isAdmin) {
            let userNoti = user?.user?.user_notifications;
            userNoti = userNoti ? userNoti : undefined;
            return (<div className="notification_container">
                <UserNotifications t={t} newUserNotifications={userNoti} userId={user?.userId} />
            </div>)

        }

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
        if (isAdmin) {
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
            {userNotifications()}
            <SettingsChangeHelper t={t} />
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