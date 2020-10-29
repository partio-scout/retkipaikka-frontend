import React from "react";


const RadioButton = (props) => {
    const { handleChange, text, id, value, name, defaultChecked } = props;
    return (
        <div className="form-check">
            <input onChange={handleChange} className="form-check-input" type="radio" name={name} id={id} value={value} defaultChecked={defaultChecked} />
            <label className="form-check-label" htmlFor={id}>
                {text}
            </label>
        </div>
    )
}
RadioButton.defaultProps = {
    text: "radiobutton",
    handleChange: () => { },
    name: "radio",
    value: "radiovalue",
    defaultChecked: false

}

export default RadioButton


