import React, { useState } from "react";
import AutoCompleteInput from "../inputform/AutoCompleteInput"
import TextInput from "../shared/TextInput"
import RadioButton from "../shared/RadioButton"
import { useDynamicState } from "../../helpers/Helpers"
import { useSelector } from "react-redux"
import TagBar from "../tagbar/TagBar"
import { modifyUserNotifications, fetchSingleUser } from "../../helpers/UserHelper"
const RegionNotifications = (props) => {
    const { t, userNotification, regions } = props;
    const { state, handleChange } = useDynamicState({ "notifications": userNotification });
    const [tags, setTags] = useState(regions.map(r => {
        r.object_type = "city";
        return r;
    }))

    const allRegions = useSelector(state => state.filters.regions)
    console.log(state)

    const handleSelection = (data) => {
        if (!tags.find((t) => t.region_id === data.region_id)) {
            let tempTags = [...tags]
            tempTags.push(data);
            setTags(tempTags);
        }
        console.log(data);
    }
    const deleteTag = (data) => {
        let newTags = tags.filter(t => t.region_id !== data.region_id);
        setTags(newTags);

    }
    const handleSubmit = () => {
        let regionArr = tags.map(t => t.region_id);
        let val = modifyUserNotifications(state["notifications"], regionArr);
        if (val) {
            fetchSingleUser().then(res => {
                console.log(res, "FETCHSING");
            })
        }


    }
    console.log(tags, "TAGIT", regions)
    return (
        <div>
            {["none", "all", "select"].map((setting => {
                return <RadioButton handleChange={handleChange} text={t("settings.regions_" + setting)} value={setting} id={"notifications"} defaultChecked={userNotification === setting} />
            }))}

            {state["notifications"] === "select" &&
                <>
                    <AutoCompleteInput t={t} data={allRegions} applyFilter={handleSelection} id="object_location" customClassName="region-notification-select" title={t("settings.region_notifications")} required={true} />
                    <TagBar adminPage={true} useGlobalState={false} handleDelete={deleteTag} localTags={tags} />
                </>

            }
            <button onClick={handleSubmit} className="btn btn-primary">{t("admin.save")}</button>

        </div>

    )
}
RegionNotifications.defaultProps = {
    regions: [],
    userNotification: "none",
    t: () => { }
}


export default RegionNotifications;