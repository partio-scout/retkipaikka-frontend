import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress"
import "./shared.css"

const Spinner = (props) => {
    const { loading, size, color } = props;

    return (
        <div className="spinner-container">
            {loading &&
                <CircularProgress
                    size={size}
                    style={{ color: color }}
                />}
        </div>
    )
}
Spinner.defaultProps = {
    loading: false,
    size: 100,
    color: "#253764"
}

export default Spinner;