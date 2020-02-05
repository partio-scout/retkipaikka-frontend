
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../actions/GeneralActions"
import "./header.css"
const LanguageMenu = ({ t }) => {
    const [menuVisible, showMenu] = useState(false)
    const languages = ["fi", "sv", "smn", "en"]
    const language = useSelector(state => state.general.language)
    const dispatch = useDispatch();
    const handleLang = (lang) => {
        lang = lang === "smn" ? "sa" : lang;
        dispatch(setLanguage(lang))
    }
    const renderMenu = () => {
        return languages.map(lang => {
            let compareLang = language;
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