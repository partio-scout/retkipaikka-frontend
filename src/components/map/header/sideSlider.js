import React from "react";
import "./mapHeader.css";

class SideSlider extends React.Component {
    render() {
        console.log(this.props.data);
        return (
            <div className="map-side-slider">
                {this.props.data}
            </div>
        )
    }
}

export default SideSlider;