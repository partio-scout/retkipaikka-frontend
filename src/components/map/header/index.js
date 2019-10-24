import React from "react";
import "./mapHeader.css";
import SideSlider from "./sideSlider";

export const generateFromSingleData = (obj) => {
    return (
        <div>
            <h4>Nimi:</h4>
            <span>{obj.name}</span>
            <br />
            <h4>Kuvaus:</h4>
            <span> {obj.description}</span>
            <br />
            <h4>Yhteystiedot:</h4>
            <span>{obj.data.ownerName}</span>
            <br />
            <span>{obj.data.website}</span>
            <br />
            <span>{obj.data.mail}</span>
            <br />
            <span>{obj.data.phone}</span>

        </div>
    )
}
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
    generateLocationInfo = (obj) => {
        //[{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, propertyType: "Laavu", has: ["Järvi lähellä"],data:{name:"hehu",website:"www.hehu.fi",contact:"oy@partio.com"} },
        return (
            <div>
                <span onClick={() => this.setState({ clickedObj: obj })}>{obj.name}</span>
            </div>
        )
    }


    handleSideSliderClose = () => {
        this.setState({ clickedObj: null });
    }

    generateAllData = (data) => {
        let shelterData = data.filter(d => d.propertyType === "Laavu");
        let houseData = data.filter(d => d.propertyType === "Kämppä");
        let regionData = data.filter(d => d.propertyType === "Alue")
        let arr = [shelterData, houseData, regionData];
        let totalDataArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length !== 0) {
                totalDataArr.push(<h4>{arr[i][0].propertyType}</h4>);
                let tempData = arr[i].map(obj => {
                    return this.generateLocationInfo(obj)
                })
                totalDataArr = totalDataArr.concat(tempData);
            }
        }
        return totalDataArr;
    }
    render() {
        const { showSideSlider, clickedObj } = this.state;
        const { resultAmount, data } = this.props;
        let tripPlace = clickedObj === null ? this.generateAllData(data) : clickedObj;
        console.log(tripPlace);
        return (
            <div className="mapheader-container">

                <div className="mapheader-helpers">
                    <span className="mapheader-left">
                        <button onClick={() => this.setState({ showSideSlider: !showSideSlider, clickedObj: null })}>{this.getText()}</button>
                        <span className="mapheader-text">Partiolaisten retkipaikat</span>
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