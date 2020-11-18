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
        console.log(state, "IN SUBMIT")
        let obj = { ...state };
        obj.admin_id = userId;
        let val = await modifyOwnSettings(obj)
        if (val) {
            fetchSingleUser()
        }


    }
    return (
        <div>
            <h3>
                {t("settings.new_user_notification")}
            </h3>
            {["none", "all"].map((setting => {
                return <RadioButton name={"radio_user_noti"} key={setting} handleChange={handleChange} text={t("settings.regions_" + setting)} value={setting} id={"user_notifications"} defaultChecked={newUserNotifications === setting} />
            }))}


            <button disabled={newUserNotifications == state.user_notifications} onClick={() => askForConfirmation("Haluatko tallentaa ilmoitusasetukset", "Salasanan vaihto", handleSubmit)} className="btn btn-primary">{t("admin.save")}</button>

        </div>

    )
}
UserNotifications.defaultProps = {
    newUserNotifications: "none",
    t: () => { }
}


export default UserNotifications;