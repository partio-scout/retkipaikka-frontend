import React, { useEffect } from "react";
import { useDynamicState, askForConfirmation } from "../../../helpers/Helpers";
import TextInput from "../../shared/TextInput"
import CheckBox from "../../shared/CheckBox"
import { useDispatch } from "react-redux"
import { editCategory, editFilter, deleteFilter, deleteCategory } from "../../../actions/FilterActions"
const UserEditDialog = (props) => {
    const { t, allRoles, data } = props;
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

    useEffect(() => {
        console.log(data, " IN USEEFFECK")
    }, [data])

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
        askForConfirmation("Haluatko tallentaa tekemäsi muokkaukset?", "Käyttäjän muokkaaminen", () => submitFilterEdit(obj), false)
    };

    const getCheckBoxes = () => {
        console.log(data, "IN GETCHECKBOXES")
        return (
            <>
                {allRoles.map(role => {
                    console.log(role, "")
                    return <CheckBox key={data.username + role.id} handleChange={handleChange} text={role.name} id={"role_" + role.id} defaultChecked={data?.roles.find(r => r.id === role.id)} />
                })}
            </>

        )
    }

    return (
        <div>
            <h4 className="move-handle">#{data.username}</h4>
            <CheckBox key={data.username} handleChange={handleChange} text={"Kirjautuminen sallittu"} id={"userEnabled"} defaultChecked={!data.new_user} />
            <h4>Roolit:</h4>
            {getCheckBoxes()}

            {data.description &&
                <>
                    <h4>Kuvaus:</h4>
                    {data.description}
                </>}


            <br />
            <br />
            {/* <button onClick={() => askForDelConfirmation(title + " poistaminen", "Haluatko poistaa " + name, data)} className="btn btn-primary info-button">{t("admin.delete")}</button> */}
            <button onClick={() => askForEditConfirmation(null, null, data)} className="btn btn-primary info-button">{t("admin.save")}</button>
        </div>
    )


}

export default UserEditDialog;
