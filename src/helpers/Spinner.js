import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./helpers.css"

const Spinner = (props) => {
    const { loading, size, color } = props;
    return (
        <div className="spinner-container">
            <div className="sweet-loading">
                <ClipLoader
                    size={size}
                    color={color}
                    loading={loading}
                />
            </div>
        </div>
    )
}
Spinner.defaultProps = {
    loading: false,
    size: 150,
    color: "#123abc"
}

export default Spinner;