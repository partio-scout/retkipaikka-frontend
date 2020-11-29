import React, { useState } from "react";
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import { useDynamicState, askForConfirmation } from "../../helpers/Helpers"
import { useSelector } from "react-redux"
import TagBar from "../tagbar/TagBar"
import { modifyUserNotifications, fetchSingleUser } from "../../helpers/UserHelper"

const RegionNotifications = (props) => {
    const { t, userNotification, regions } = props;
    const { state, handleChange } = useDynamicState({ "notifications": userNotification });
    var tagsModified = false;
    const [tags, setTags] = useState({
        tags: regions.map(r => {
            r.object_type = "city";
            return r;
        }),
        tagsModified: false
    })


    const allRegions = useSelector(state => state.filters.regions)

    const handleSelection = (data) => {
        if (!tags.tags.find((t) => t.region_id === data.region_id)) {
            let tempTags = [...tags.tags]
            tempTags.push(data);
            tagsModified = true;
            setTags({ tags: tempTags, tagsModified: true });
        }
    }

    const deleteTag = (data) => {
        let newTags = tags.tags.filter(t => t.region_id !== data.region_id);
        tagsModified = true;
        setTags({ tags: newTags, tagsModified: true });

    }
    const handleSubmit = async () => {
        let regionArr = tags.tags.map(t => t.region_id);
        let val = await modifyUserNotifications(state.notifications, regionArr);
        if (val) {
            await fetchSingleUser()
        }


    }
    return (
        <div>
            <h3>
                {t("settings.notification_title")}
            </h3>
            {["none", "all", "select"].map((setting => {
                return <RadioButton key={setting} handleChange={handleChange} text={t("settings.regions_" + setting)} value={setting} id={"notifications"} defaultChecked={userNotification === setting} />
            }))}

            {state.notifications === "select" &&
                <>
                    <AutoCompleteInput t={t} data={allRegions} applyFilter={handleSelection} id="object_location" customClassName="region-notification-select" title={t("settings.region_notifications")} required={true} />
                    <TagBar adminPage={true} useGlobalState={false} handleDelete={deleteTag} localTags={tags.tags} />
                </>

            }
            <button disabled={userNotification == state.notifications && !tags.tagsModified} onClick={() => askForConfirmation("Haluatko tallentaa ilmoitusasetukset", "Salasanan vaihto", handleSubmit)} className="btn btn-primary">{t("admin.save")}</button>

        </div>

    )
}
RegionNotifications.defaultProps = {
    regions: [],
    userNotification: "none",
    t: () => { }
}


export default RegionNotifications;