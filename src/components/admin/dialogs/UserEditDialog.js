import React, { useEffect } from "react";
import { useDynamicState, askForConfirmation } from "../../../helpers/Helpers";
import TextInput from "../../shared/TextInput"
import CheckBox from "../../shared/CheckBox"
import { useDispatch } from "react-redux"
import { modifyUser } from "../../../helpers/UserHelper"
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

        userObj.user.new_user = !state.userEnabled;

        let roleArr = Object.keys(state).filter(key => key.includes("role"))
        roleArr.forEach(r => {
            if (r) {
                userObj.roles.push(parseInt(r.split("_")[1]));
            }
        })

        await modifyUser(userObj)
        await fetchData()
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
        askForConfirmation("Haluatko tallentaa tekemäsi muokkaukset?", "Käyttäjän muokkaaminen", () => submitUserEdit(obj), false)
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
