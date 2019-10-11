import React from "react";
import { connect } from "react-redux";

const TextInput = (props) => {
    const { placeholder, helper, size, handleChange, text, id, required, customType, coords } = props;
    let className = size ? "form-group " + size : "form-group";

    return (
        <div className={className}>
            <label htmlFor={text + "-input"}>{text}</label>
            <div className="input-group">
                {id === "geo" ?
                    <input onChange={handleChange} value={coords ? coords.lat + ", " + coords.lng : ""} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} readOnly required={required} /> :
                    <input onChange={handleChange} type={customType || "text"} className="form-control" id={id} placeholder={placeholder} required={required} />}
            </div>

            <small id={text + "Help"} className="form-text text-muted">{helper}</small>
        </div>)
}

const mapStateToProps = state => {
    return {
        coords: state.map.coords
    }
}


export default connect(mapStateToProps)(TextInput);