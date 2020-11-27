import React from "react";

import NotificationComponent from "../notifications/NotificationComponent";
import { useDynamicState, askForConfirmation, postNotification, clearFormByClassName, editNotification, deleteNotification } from "../../helpers/Helpers"
import TextInput from "../shared/TextInput"
import LanguageMenu from "../header/LanguageMenu"
import CheckBox from "../shared/CheckBox"
const NotificationCreator = (props) => {
    const { t, data, editing, handleClose } = props;
    let obj = data;
    const formClassName = editing ? "needs-validation-edit" : "needs-validation"
    if (!data) {
        obj = {
            top_title: "Yläotsikko",
            title: "Otsikko",
            bottom_title: "Alaotsikko",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            link_text: "nappi",
            link_url: "https://www.google.com",
            display_frontpage: false,
            enabled: false

        }
    }
    const { state, handleChange, setByKey, setState } = useDynamicState(obj);
    const validate = (e) => {

        e.preventDefault();
        let emptyFound = false;
        var forms = document.getElementsByClassName(formClassName);

        Array.prototype.filter.call(forms, function (form) {
            if (form.checkValidity() === false) {
                e.stopPropagation();
                emptyFound = true;
            }
            form.classList.add('was-validated');
        })
        if (emptyFound) {
            return false;
        }
        return true;
    }

    const titleForm = () => {
        return (
            <div className="form-row">
                <TextInput maxLength={64} defaultValue={obj.title} handleChange={handleChange} id={"title"} placeholder="Suomeksi" text={"Pääotsikko"} size="col-md-3" required={true} />
                <TextInput maxLength={64} defaultValue={obj.title_sv} handleChange={handleChange} id={"title_sv"} placeholder="Ruotsiksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.title_sa} handleChange={handleChange} id={"title_sa"} placeholder="Saameksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.title_en} handleChange={handleChange} id={"title_en"} placeholder="Englanniksi" text="-" size="col-md-3" required={false} />
            </div>
        )
    }
    const topTitleForm = () => {

        return (
            <div className="form-row">
                <TextInput maxLength={64} defaultValue={obj.top_title} handleChange={handleChange} id={"top_title"} placeholder="Suomeksi" text={"Yläotsikko"} size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.top_title_sv} handleChange={handleChange} id={"top_title_sv"} placeholder="Ruotsiksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.top_title_sa} handleChange={handleChange} id={"top_title_sa"} placeholder="Saameksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.top_title_en} handleChange={handleChange} id={"top_title_en"} placeholder="Englanniksi" text="-" size="col-md-3" required={false} />
            </div>
        )
    }
    const bottomTitleForm = () => {

        return (
            <div className="form-row">
                <TextInput maxLength={64} defaultValue={obj.bottom_title} handleChange={handleChange} id={"bottom_title"} placeholder="Suomeksi" text={"Alaotsikko"} size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.bottom_title_sv} handleChange={handleChange} id={"bottom_title_sv"} placeholder="Ruotsiksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.bottom_title_sa} handleChange={handleChange} id={"bottom_title_sa"} placeholder="Saameksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={64} defaultValue={obj.bottom_title_en} handleChange={handleChange} id={"bottom_title_en"} placeholder="Englanniksi" text="-" size="col-md-3" required={false} />
            </div>
        )
    }
    const textForm = () => {

        return (
            <div className="form-row">
                <TextInput maxLength={512} defaultValue={obj.text} handleChange={handleChange} id={"text"} placeholder="Suomeksi" text={"Teksti"} size="col-md-3" required={true} />
                <TextInput maxLength={512} defaultValue={obj.text_sv} handleChange={handleChange} id={"text_sv"} placeholder="Ruotsiksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={512} defaultValue={obj.text_sa} handleChange={handleChange} id={"text_sa"} placeholder="Saameksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={512} defaultValue={obj.text_en} handleChange={handleChange} id={"text_en"} placeholder="Englanniksi" text="-" size="col-md-3" required={false} />
            </div>
        )
    }
    const linkTextForm = () => {

        return (
            <div className="form-row">
                <TextInput maxLength={32} defaultValue={obj.link_text} handleChange={handleChange} id={"link_text"} placeholder="Suomeksi" text={"Linkin teksti"} size="col-md-3" required={false} />
                <TextInput maxLength={32} defaultValue={obj.link_text_sv} handleChange={handleChange} id={"link_text_sv"} placeholder="Ruotsiksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={32} defaultValue={obj.link_text_sa} handleChange={handleChange} id={"link_text_sa"} placeholder="Saameksi" text="-" size="col-md-3" required={false} />
                <TextInput maxLength={32} defaultValue={obj.link_text_en} handleChange={handleChange} id={"link_text_en"} placeholder="Englanniksi" text="-" size="col-md-3" required={false} />
            </div>
        )
    }
    const linkForm = () => {


        return (
            <div className="form-row">
                <TextInput maxLength={512} defaultValue={obj.link_url} handleChange={handleChange} id={"link_url"} placeholder="Suomeksi" text={"Linkin teksti"} size="col-md-3" required={false} />
            </div>
        )

    }
    const createCheckboxes = () => {
        return (
            <div>
                <CheckBox handleChange={handleChange} text={"Näytä listassa"} id={"enabled"} defaultChecked={obj.enabled} />
                <CheckBox handleChange={handleChange} text={"Näytä etusivun bannerissa"} id={"display_frontpage"} defaultChecked={obj.display_frontpage} />
            </div>
        )

    }
    const postEdit = async (newObj) => {
        let res = await editNotification(data.notification_id, newObj)
        if (res) {
            handleClose()
        }
    }
    const postSave = async (newObj) => {
        let res = await postNotification(newObj);
        if (res) {
            clearFormByClassName("form-control");
            setState({})
            handleClose()
        }
    }
    const handleSave = () => {
        let newObj = { ...state };
        console.log(state, "STATE")
        Object.keys(newObj).forEach(k => {
            if (typeof newObj[k] !== 'boolean' && newObj[k] != null) {
                if (newObj[k].length == 0) {
                    if (editing) {
                        newObj[k] = null;
                    } else {
                        delete newObj[k]
                    }


                }
            }
        })

        if (editing) {
            askForConfirmation("Haluatko tallentaa muutokset?", "Ilmoituksen muokkaaminen", () => postEdit(newObj), false)

        } else {
            askForConfirmation("Haluatko luoda ilmoituksen?", "Ilmoituksen luominen", () => postSave(newObj), false)
        }


    }
    const saveClick = (e) => {
        if (validate(e)) {
            handleSave();


        }
    }
    const handleDelete = async () => {
        let res = await deleteNotification(data.notification_id)
        if (res) {
            handleClose()
        }
    }

    const prefix = state.language == null || state.language == "fi" ? "" : "_" + state.language;
    return (<div className="notificationCreator">
        <LanguageMenu handleChange={(value) => setByKey("language", value)} value={state.language} />
        <NotificationComponent
            topTitle={state["top_title" + prefix]}
            title={state["title" + prefix]}
            bottomTitle={state["bottom_title" + prefix]}
            text={state["text" + prefix]}
            linkText={state["link_text" + prefix]}
            linkUrl={state["link_url"]}
        />
        <form className={formClassName} noValidate>
            {topTitleForm()}
            {titleForm()}
            {bottomTitleForm()}
            {textForm()}
            {linkTextForm()}
            {linkForm()}
            {createCheckboxes()}
        </form>

        <button onClick={saveClick} className="btn btn-primary">{t("admin.save")}</button>
        {editing && <button onClick={() => askForConfirmation("Haluatko poistaa ilmoituksen?", "Ilmoituksen poistaminen", handleDelete, false)} className="btn btn-primary">{t("admin.delete")}</button>}
    </div>)
}

NotificationCreator.defaultProps = {
    editing: false,
    handleClose: () => { }
}

export default NotificationCreator;