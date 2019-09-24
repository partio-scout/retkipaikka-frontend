import React from "react";
import "./mapHeader.css";
import { generateFromSingleData } from "./index"
class SideSlider extends React.Component {

    getText = () => {
        return "<-";
    }

    render() {
        console.log("render slider")
        let className = "map-side-slider component"
        return (
            <div className={this.props.class ? className + this.props.class : className}>
                <button onClick={this.props.handleClose}>{this.getText()}</button>
                <div className="side-slider-data">
                    {generateFromSingleData(this.props.data)}
                </div>

            </div>


        )
    }
}

export default SideSlider;