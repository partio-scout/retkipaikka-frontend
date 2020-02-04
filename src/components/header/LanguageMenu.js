
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../actions/GeneralActions"
import "./header.css"
const LanguageMenu = ({ t }) => {
    const [menuVisible, showMenu] = useState(false)
    const languages = ["fi", "sv", "sa", "en"]
    const language = useSelector(state => state.general.language)
    const dispatch = useDispatch();

    const renderMenu = () => {
        return languages.map(lang => {
            return <span className={language === lang ? "language-menu-item lang-selected" : "language-menu-item"} onClick={() => dispatch(setLanguage(lang))}>{lang}</span>
        })
    }

    return (
        <div>
            <span>{t("main.language")}</span>
            <img onClick={() => showMenu(!menuVisible)} className={menuVisible ? "language-icon inverse-icon-lang" : "language-icon"} alt="imgarrow" src={_ICON_PATH_ + "arrow_white.svg"} />
            <div className="language-menu">
                {menuVisible && renderMenu()}
            </div>

        </div>
    )


}

export default LanguageMenu