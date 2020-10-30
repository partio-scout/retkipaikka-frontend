import React from "react";
import { useDynamicState, askForConfirmation } from "../../helpers/Helpers";
import TextInput from "../shared/TextInput"
import { useDispatch } from "react-redux"
import { editCategory, editFilter, deleteFilter, deleteCategory } from "../../actions/FilterActions"
const FilterEditDialog = (props) => {
    const { t, handleClose, data } = props;
    const { state, handleChange } = useDynamicState({})
    const dispatch = useDispatch();
    const submitFilterEdit = async (obj) => {
        let langArr = ["en", "sv", "sa"]
        let newObj = {}
        let type = obj.object_type;
        let idField = type === "locationtype" ? "category_id" : "filter_id"
        newObj[idField] = obj[idField];
        if (state[type]) {
            newObj.object_name = state[type];
        }
        langArr.forEach(l => {
            let stateVal = state[type + "_" + l]
            if (stateVal) {
                newObj["object_name_" + l] = stateVal
            }
        })

        switch (type) {
            case "locationtype":
                await dispatch(editCategory(newObj))
                break;
            case "filter":
                await dispatch(editFilter(newObj))
                break;
        }
        handleClose();

    }
    const handleDelete = async (obj) => {
        console.log(obj);
        if (obj.object_type === "filter") {
            await dispatch(deleteFilter(obj));
        } else {
            await dispatch(deleteCategory(obj));
        }
        handleClose()

    }
    const askForDelConfirmation = (title, message, obj) => {
        askForConfirmation(message, title, () => handleDelete(obj), false)

    };
    const askForEditConfirmation = (name, title, obj) => {
        askForConfirmation("Haluatko tallentaa tekemäsi muokkaukset?", title + " muokkaaminen", () => submitFilterEdit(obj), false)
    };

    const getForms = (obj) => {
        let textInfo = obj.object_type === "locationtype" ? "kategorian" : "suodattimen"
        let helperInfo = obj.object_type === "locationtype" ? "Kategoria" : "Suodatin"
        return (
            <div className="form-row">
                <TextInput maxLength={64} defaultValue={obj.object_name} handleChange={handleChange} id={obj.object_type} placeholder="Suomeksi" helper={"Kirjoita lisättävän " + textInfo + " nimi*"} text={helperInfo} size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.object_name_sv} handleChange={handleChange} id={obj.object_type + "_sv"} placeholder="Ruotsiksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.object_name_sa} handleChange={handleChange} id={obj.object_type + "_sa"} placeholder="Saameksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.object_name_en} handleChange={handleChange} id={obj.object_type + "_en"} placeholder="Englanniksi" helper={"Kirjoita lisättävän " + textInfo + " nimi"} text="-" size="col-md-3" required={false} />
            </div>)
    }


    let id = data.filter_id ? data.filter_id : data.category_id;
    let name = data.object_name
    let title = data.filter_id ? "Suodattimen " : "Kategorian ";
    return (
        <div>
            <h4 className="move-handle">#{id}</h4>

            <h4>Nimi:</h4>
            {getForms(data)}
            <br />
            <br />
            <button onClick={() => askForDelConfirmation(title + " poistaminen", "Haluatko poistaa " + name, data)} className="btn btn-primary info-button">{t("admin.delete")}</button>
            <button onClick={() => askForEditConfirmation(name, title, data)} className="btn btn-primary info-button">{t("admin.save")}</button>
        </div>
    )


}

export default FilterEditDialog;
