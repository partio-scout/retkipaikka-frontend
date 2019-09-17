import React from "react";
import "./mapHeader.css";
import SideSlider from "./sideSlider";

class MapHeader extends React.Component {
    state = {
        showSideSlider: false,
        clickedObj: this.props.clickedObj
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

    generateFromSingleData = (obj) => {
        console.log(obj);
        return (
            <div>
                nimi:
                <br />
                <span>{obj.name}</span>
                <br />
                kuvaus:

                <span> {obj.data.name}</span>
                <br />
                Yhteystiedot:
                <br />
                <span>{obj.data.website}</span>
                <br />
                <span>{obj.data.contact}</span>

            </div>
        )
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
        console.log(showSideSlider);
        let tripPlace = clickedObj === null ? this.generateAllData(data) : this.generateFromSingleData(clickedObj);

        return (
            <div className="mapheader-container">
                <div className="mapheader-helpers">
                    <span className="mapheader-left">
                        <button onClick={() => this.setState({ showSideSlider: !showSideSlider, clickedObj: null })}>{this.getText()}</button>
                        <span className="mapheader-text">Partiolaisten retkipaikat</span>
                        <span className="mapheader-results">Retkipaikkojen määrä: {resultAmount}</span>
                    </span>
                </div>
                {showSideSlider && <SideSlider data={tripPlace} />}
            </div>
        )
    }
}

export default MapHeader;