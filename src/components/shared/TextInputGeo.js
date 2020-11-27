import React from "react";
import { useSelector } from "react-redux";

const TextInput = (props) => {
    const { placeholder, helper, size, handleChange, text, id, required, customType, defaultValue, maxLength } = props;
    let className = size ? "form-group " + size : "form-group";
    const coords = useSelector(state => state.map.coords);
    // if default value prop is passed, use it
    // also for geo input, dont allow writing and get coordinates on click
    return (
        <div className={className} key={defaultValue}>
            <label htmlFor={text + "-input"}>{text + (required ? "*" : "")}</label>
            <div className="input-group">
                {defaultValue ? <input maxLength={maxLength} onChange={handleChange} defaultValue={defaultValue} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} /> :
                    id === "location_geo" ?
                        <input onClick={() => window.scrollTo({ top: 250, behavior: 'smooth' })} onChange={handleChange} value={coords ? coords.lat + ", " + coords.lng : ""} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} readOnly required={required} /> :
                        <input maxLength={maxLength} onChange={handleChange} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} />}
            </div>

            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}

export default TextInput

