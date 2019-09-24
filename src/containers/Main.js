import React from "react";
import "./styles/main.css";
import Map from "../components/map"
import Header from "../components/header"
import InputContainer from "../components/inputform"
import LocationForm from "../components/locationform"
import { connect } from "react-redux";
import { fetchLocations } from "../actions/SearchResultsActions"
//import {imagesPath} from "../paths"

class Main extends React.Component {
    componentWillMount() {
        const { fetchLocations, results } = this.props;
        if (results.searchResults.length === 0) {
            fetchLocations()
        }
    }

    render() {
        const imagesPath = "/images/";
        console.log(imagesPath + "frontpage_img.jpg")
        return (
            <div className="frontpage-container">
                <Header />
                <div className="frontpage-image-container">
                    <img alt="frontpage_image" src={imagesPath + "frontpage_img.jpg"} />
                    <h2 className="main-header">Partio retkipaikat</h2>
                </div>
                <InputContainer />
                <Map />
                <LocationForm />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        results: state.searchResults
    }
}
export default connect(mapStateToProps, { fetchLocations })(Main);