import React from "react";
import "./mapHeader.css";
import SideSlider from "./sideSlider";
import { connect } from "react-redux";
import { selectMapHeaderLocation } from "../../../actions/MapActions"
import Spinner from "../../shared/Spinner"
import AmountSelect from "../AmountSelect";
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
        const { selectMapHeaderLocation } = this.props;
        //[{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, propertyType: "Laavu", has: ["Järvi lähellä"],data:{name:"hehu",website:"www.hehu.fi",contact:"oy@partio.com"} },
        return (
            <div key={obj.location_name + i}>
                <span className="pointer" onClick={() => selectMapHeaderLocation(obj)}>{obj.location_name}</span>
            </div>
        )
    }


    handleSideSliderClose = () => {
        this.setState({ clickedObj: null });
    }

    generateAllData = (data) => {
        const { types, language } = this.props;
        let totalDataArr = [];
        let langEnd = language === "fi" ? "object_name" : "object_name_" + language
        //types contain all locationtypes, first one is blank so start at 1
        for (let i = 1; i < types.length; ++i) {
            // filter locations of the current
            let id = types[i].category_id
            //first check selected lang, then english, then finnish
            let type = types[i][langEnd] ? types[i][langEnd] : types[i]["object_name_en"] ? types[i]["object_name_en"] : types[i]["object_name"]
            let arr = data.filter(d => d.location_category === id);
            if (arr.length > 0) {
                // add title and then add the rest elements
                totalDataArr.push(<h4 key={i}>{type}</h4>);
                for (let j = 0; j < arr.length; ++j) {
                    totalDataArr.push(this.generateLocationInfo(arr[j], j))


                }
            }
        }
        return totalDataArr;
    }


    render() {
        const { showSideSlider } = this.state;
        const { resultAmount, data, t, mapHeaderLocation, loading, changeLocationCount } = this.props;
        //let tripPlace = clickedObj === null ? this.generateAllData(data) : clickedObj;
        //let tripPlace = clickedObj === null ? this.generateAllData(data) : clickedObj;
        return (
            <div className="mapheader-container">
                <Spinner loading={loading} />
                <div className="mapheader-helpers">
                    <span className="mapheader-left">
                        <span className="mapheader-actions">
                            <img onClick={() => this.setState({ showSideSlider: !showSideSlider })} className={"pointer " + (showSideSlider ? "side-slider-icon-open" : "side-slider-icon-closed")} src={_ICON_PATH_ + "arrow_white.svg"}></img>
                            <span className="mapheader-text">Partion retkipaikat</span>
                        </span>
                        <span className="mapheader-results">
                            <AmountSelect changeLocationCount={changeLocationCount} t={t} />
                            <span className="mapheader-count">
                                {resultAmount}
                            </span>

                        </span>
                    </span>
                </div>
                <SideSlider t={t} />
                {(showSideSlider && !mapHeaderLocation) &&
                    <div className="map-side-slider">
                        {this.generateAllData(data)}
                    </div>}

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        mapHeaderLocation: state.map.mapHeaderLocation,
        loading: state.general.loading
    }
}
export default connect(mapStateToProps, { selectMapHeaderLocation })(MapHeader);
