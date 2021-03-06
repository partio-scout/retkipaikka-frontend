import React from "react";
import { useSelector } from "react-redux";

const TextInput = (props) => {
    const { placeholder, helper, size, handleChange, text, id, required, customType, defaultValue, maxLength } = props;
    let className = size ? "form-group " + size : "form-group";
    return (
        <div className={className} key={defaultValue}>
            <label htmlFor={text + "-input"}>{text + (required ? "*" : "")}</label>
            <div className="input-group">
                {defaultValue ? <input maxLength={maxLength} onChange={handleChange} defaultValue={defaultValue} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} /> :
                    <input maxLength={maxLength} onChange={handleChange} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} />}
            </div>

            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}

export default TextInput

