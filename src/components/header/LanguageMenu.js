
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../actions/GeneralActions"
import "./header.css"
const LanguageMenu = ({ t, handleChange, value }) => {
    const languages = ["fi", "sv", "smn", "en"]
    const language = useSelector(state => state.general.language)
    const dispatch = useDispatch();
    const handleLang = (lang) => {
        lang = lang === "smn" ? "sa" : lang;
        if (handleChange != null) {
            handleChange(lang)
        } else {
            dispatch(setLanguage(lang))
        }

    }
    const renderMenu = () => {
        let compareLang = value == null ? language : value;
        return languages.map(lang => {
            compareLang = compareLang === "sa" ? "smn" : compareLang
            return <span key={lang} className={compareLang === lang ? "language-menu-item lang-selected" : "language-menu-item"} onClick={() => handleLang(lang)}>{lang.toUpperCase()}</span>
        })
    }

    return (
        <div>

            {/* <img onClick={() => showMenu(!menuVisible)} className={menuVisible ? "language-icon inverse-icon-lang" : "language-icon"} alt="imgarrow" src={_ICON_PATH_ + "arrow_white.svg"} /> */}
            <div className="language-menu">
                {renderMenu()}
            </div>

        </div>
    )


}

export default LanguageMenu