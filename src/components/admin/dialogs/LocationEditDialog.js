import React, { useState, useEffect } from "react";
import moment from "moment"
import { useDispatch } from "react-redux";
import { deleteLocation } from "../../../actions/SearchResultsActions"
import LocationForm from "../../locationform/LocationForm"
import { askForConfirmation } from "../../../helpers/Helpers"
const LocationEditDialog = (props) => {
    const { t, handleClose, data } = props;
    const [editEnabled, setEditEnabled] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        // if edit form is opened
        if (editEnabled !== null) {
            // check if user clicked other location object, in the table
            // if clicked, disable edit form
            if (data.location_id !== editEnabled.location_id) {
                setEditEnabled(null);
            }
        }

    }, [data])


    const handleEditClick = (obj) => {
        let value = obj;
        if (editEnabled) {
            value = null;
        }
        setEditEnabled(value);

    }
    const generateFromSingleData = (obj) => {
        return (
            <div>
                <h4 className="move-handle">#{obj.location_id}</h4>

                <h4>{t("admin.name")}:</h4>
                <span>{obj.location_name}</span>
                <br />
                <h4>{t("form.description")}:</h4>
                <span> {obj.location_description}</span>
                <br />
                {obj.location_pricing &&
                    <span>
                        <h4>{t("form.pricing")}:</h4>
                        <span> {obj.location_pricing}</span>

                    </span>}

                <h4>{t("form.contact")}</h4>
                <span>{t("admin.owner")} </span>
                <span>{obj.location_owner}</span>
                {obj.location_website &&
                    <span>
                        <br />
                        <span>{t("form.website")}: </span>
                        <span>{obj.location_website}</span>
                    </span>}
                {obj.location_mail &&
                    <span>
                        <br />
                        <span>{t("form.email")}: </span>
                        <span>{obj.location_mail}</span>
                    </span>}
                {obj.location_phone &&
                    <span>
                        <br />
                        <span>{t("form.phone")} </span>
                        <span>{obj.location_phone}</span>
                    </span>}
                <h4>{t("form.info")}:</h4>
                <span>{t("form.added")}: </span>
                <span>{moment(obj.createdAt).format("DD.MM.YYYY")}</span>
                <br />
                <span>{t("form.edited")}: </span>
                <span>{moment(obj.updatedAt).format("DD.MM.YYYY")}</span>
                {obj.location_editor &&
                    <span>, {obj.location_editor} </span>}
                <br />
                <br />
                <button onClick={() => handleDelete(obj)} className="btn btn-primary info-button">{t("admin.delete")}</button>
                <button onClick={() => handleEditClick(obj)} className="btn btn-primary info-button">{t("admin.edit")}</button>

            </div>
        )
    }

    const submitDelete = (obj) => {
        let objToId = { location_id: obj.location_id };
        dispatch(deleteLocation(objToId));
        handleClose();
        window.scrollTo({ top: 0, behavior: 'smooth' });


    }

    const handleDelete = (obj) => {
        askForConfirmation('Haluatko varmasti poistaa retkipaikan ' + obj.location_name + "?", "Retkipaikan poistaminen", () => submitDelete(obj), false)
    };



    return (
        <div>
            {generateFromSingleData(data)}
            {editEnabled !== null && <LocationForm t={t} handleClose={handleClose} editPageObj={data} />}
        </div>

    )



}

LocationEditDialog.defaultProps = {
    handleClose: () => { },
    data: {},
    t: () => { }
}
export default LocationEditDialog;