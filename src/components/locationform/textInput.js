import React from "react";

const TextInput = (props) => {
    const { placeholder, helper, size, handleChange, text } = props;
    let className = size ? "form-group " + size : "form-group";

    return (
        <div className={className}>
            <label htmlFor={text + "-input"}>{text}</label>
            <input onChange={handleChange} type="text" className="form-control" id={text} placeholder={placeholder} />
            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}

export default TextInput