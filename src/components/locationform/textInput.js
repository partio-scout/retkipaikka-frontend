import React from "react";

const TextInput = (props) => {
    const { placeholder, helper, size, handleChange, text, id, required, customType } = props;
    let className = size ? "form-group " + size : "form-group";

    return (
        <div className={className}>
            <label htmlFor={text + "-input"}>{text}</label>
            <div className="input-group">
                <input onChange={handleChange} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} />
                {/* <div className="invalid-feedback">
                    Tämä on pakollinen kenttä!
                </div> */}
            </div>

            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}

export default TextInput