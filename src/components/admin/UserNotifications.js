import React, { useState } from "react";
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import { useDynamicState, askForConfirmation } from "../../helpers/Helpers"
import { useSelector } from "react-redux"
import TagBar from "../tagbar/TagBar"
import { modifyUserNotifications, fetchSingleUser, modifyOwnSettings } from "../../helpers/UserHelper"

const UserNotifications = (props) => {
    const { t, newUserNotifications, userId } = props;
    const { state, handleChange } = useDynamicState({ "user_notifications": newUserNotifications });




    const handleSubmit = async () => {
        let obj = { ...state };
        obj.admin_id = userId;
        let val = await modifyOwnSettings(obj)
        if (val) {
            await fetchSingleUser()
        }


    }
    return (
        <div>
            <h3>
                {t("admin.new_user_notification")}
            </h3>
            {["none", "all"].map((setting => {
                return <RadioButton name={"radio_user_noti"} key={setting} handleChange={handleChange} text={t("admin.regions_" + setting)} value={setting} id={"user_notifications"} defaultChecked={newUserNotifications === setting} />
            }))}


            <button disabled={newUserNotifications == state.user_notifications} onClick={() => askForConfirmation(t("admin.email_notification_text"), t("admin.email_notification_title"), handleSubmit)} className="btn btn-primary">{t("admin.save")}</button>

        </div>

    )
}
UserNotifications.defaultProps = {
    newUserNotifications: "none",
    t: () => { }
}


export default UserNotifications;