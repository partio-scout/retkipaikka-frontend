import React from "react";
import "./mapHeader.css";
import SideSlider from "./sideSlider";


class MapHeader extends React.Component {
    state = {
        showSideSlider: false,
        showInfoSideSlider: false,
        clickedObj: null
    }
    getText = () => {
        const { showSideSlider } = this.state;
        return showSideSlider ? "<-" : "->";
    }
    generateLocationInfo = (obj, i) => {

        //[{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, propertyType: "Laavu", has: ["Järvi lähellä"],data:{name:"hehu",website:"www.hehu.fi",contact:"oy@partio.com"} },
        return (
            <div key={obj.location_name + i}>
                <span onClick={() => this.setState({ clickedObj: obj })}>{obj.location_name}</span>
            </div>
        )
    }


    handleSideSliderClose = () => {
        this.setState({ clickedObj: null });
    }

    generateAllData = (data) => {
        const { types } = this.props;
        let totalDataArr = [];
        //types contain all locationtypes, first one is blank so start at 1
        for (let i = 1; i < types.length; ++i) {
            // filter locations of the current
            let type = types[i].object_name;
            let arr = data.filter(d => d.location_category === type);
            if (arr.length > 0) {
                // add title and then add the rest elements
                totalDataArr.push(<h4 key={i}>{arr[0].location_category}</h4>);
                for (let j = 0; j < arr.length; ++j) {
                    totalDataArr.push(this.generateLocationInfo(arr[j], j))


                }
            }
            // let shelterData = data.filter(d => d.propertyType === "Laavu");
            // let houseData = data.filter(d => d.propertyType === "Kämppä");
            // let regionData = data.filter(d => d.propertyType === "Alue")
            // let arr = [shelterData, houseData, regionData];


        }
        return totalDataArr;
    }
    render() {
        const { showSideSlider, clickedObj } = this.state;
        const { resultAmount, data } = this.props;
        //let tripPlace = clickedObj === null ? this.generateAllData(data) : clickedObj;
        let tripPlace = clickedObj === null ? this.generateAllData(data) : clickedObj;
        return (
            <div className="mapheader-container">

                <div className="mapheader-helpers">
                    <span onClick={() => this.setState({ showSideSlider: !showSideSlider, clickedObj: null })} className="mapheader-left">
                        <img className={showSideSlider ? "side-slider-icon-open" : "side-slider-icon-closed"} src={_ICON_PATH_ + "arrow_white.svg"}></img>
                        <span className="mapheader-text">Partion retkipaikat</span>
                        <span className="mapheader-results"> {resultAmount}</span>
                    </span>
                </div>
                {clickedObj !== null &&
                    <SideSlider handleClose={this.handleSideSliderClose} data={tripPlace} />
                }
                {(showSideSlider && clickedObj === null) &&
                    <div className="map-side-slider">
                        {tripPlace}
                    </div>}

            </div>
        )
    }
}

export default MapHeader;