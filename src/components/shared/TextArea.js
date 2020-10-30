import React from "react";



const TextArea = (props) => {
    const { rows, text, helper, defaultValue, id, maxLength, handleChange } = props;
    return (
        <div className="form-group">
            <label htmlFor="text-area">{text}</label>
            <textarea maxLength={maxLength} defaultValue={defaultValue !== null ? defaultValue : ""} onChange={handleChange} className="form-control" id={id} rows={rows}></textarea>
            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}
TextArea.defaultProps = {
    rows: "3",
    text: "textarea",
    helper: "textarea-helper",
    defaultValue: "",
    id: "textarea",
    maxLength: 100
}

export default TextArea
