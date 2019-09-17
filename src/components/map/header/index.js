import React from "react";
import "./mapHeader.css";
import SideSlider from "./sideSlider";

class MapHeader extends React.Component {
    state = {
        showSideSlider: false
    }
    getText = () => {
        const { showSideSlider } = this.state;
        return showSideSlider ? "<-" : "->";
    }
    render() {
        const { showSideSlider } = this.state;
        const { resultAmount } = this.props;
        return (
            <div className="mapheader-container">
                <div className="mapheader-helpers">
                    <span className="mapheader-left">
                        <button onClick={() => this.setState({ showSideSlider: !showSideSlider })}>{this.getText()}</button>
                        <span className="mapheader-text">Partiolaisten retkipaikat</span>
                        <span className="mapheader-results">Retkipaikkojen määrä: {resultAmount}</span>
                    </span>
                </div>
                {showSideSlider && <SideSlider />}
            </div>
        )
    }
}

export default MapHeader;