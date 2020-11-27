import React, { useEffect } from "react";
import { useDynamicState, askForConfirmation } from "../../../helpers/Helpers";
import TextInput from "../../shared/TextInput"
import CheckBox from "../../shared/CheckBox"
import { useDispatch } from "react-redux"
import { modifyUser, deleteUser } from "../../../helpers/UserHelper"
import { useAdminContext } from "../../../context/AdminContext"
const UserEditDialog = (props) => {
    const { t, data, handleClose } = props;
    const { state, handleChange } = useDynamicState({})
    const { allRoles, fetchData } = useAdminContext();

    const submitUserEdit = async (obj) => {
        let userObj = {
            user: {
                admin_id: obj.admin_id,
            },
            roles: []
        }
        console.log(state);
        if (state.userEnabled != null) {
            userObj.user.new_user = !state.userEnabled
        }

        let roleArr = Object.keys(state).filter(key => key.includes("role"))
        if (roleArr.length == 0) {
            userObj.roles = obj.roles.map(r => r.id)
        } else {
            roleArr.forEach(r => {
                if (state[r]) {
                    userObj.roles.push(parseInt(r.split("_")[1]));
                }
            })
        }



        await modifyUser(userObj)
        await fetchData()
        handleClose();

    }


    const handleDelete = async (obj) => {
        await deleteUser(obj);
        await fetchData();
        handleClose()

    }
    const askForDelConfirmation = (title, message, obj) => {
        askForConfirmation("Haluatko poistaa käyttäjän?", "Käyttäjän poistaminen", () => handleDelete(obj), false)

    };
    const askForEditConfirmation = (name, title, obj) => {
        askForConfirmation("Haluatko tallentaa tekemäsi muokkaukset?", "Käyttäjän muokkaaminen", () => submitUserEdit(obj), false)
    };

    const getCheckBoxes = () => {
        return (
            <>
                {allRoles.map(role => {
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
            <button onClick={() => askForDelConfirmation(null, null, data)} className="btn btn-primary info-button">{t("admin.delete")}</button>
        </div>
    )


}

export default UserEditDialog;
