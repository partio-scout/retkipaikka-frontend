import React from "react";


const CheckBox = (props) => {
    const { handleChange, text, id, defaultChecked } = props;
    return (
        <div className="form-check form-check-inline" >
            <input onChange={handleChange} className="form-check-input" type="checkbox" id={id} defaultChecked={defaultChecked} />
            <label className="form-check-label" htmlFor={text}>
                {text}
            </label>
        </div>
    )
}


CheckBox.defaultProps = {
    text: "radiobutton",
    handleChange: () => { },
    defaultChecked: false
}

export default CheckBox