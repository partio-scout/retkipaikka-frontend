import React from "react";
import { connect } from "react-redux";
import { removeFilter } from "../../actions/FilterActions"
import "./locationform.css"


class TagBar extends React.Component {
    state = {
        name: null,
        location: { name: null, geo: null },
        propertyType: null,
        has: [],
        data: { name: null, website: null, mail: null, phone: null }
    }
    //propertytypes:
    //laavu, kämppä, alue
    //has:
    //sauna, järvi lähellä, sisämajoitus,sisävessa

    //{ type: "city", name: "Testialue", text: "Turku", geo: { lat: 60.45, lng: 22.26 }, propertyType: "Alue", has: ["Järvi lähellä", "Sauna"], 
    //data: { name: "hehu", website: "www.hehu.fi", contact: "oy@partio.com" } },
    handleFormSubmit = () => {
        //nimi



    }
    generateLocationForm = () => {
        return (<form>
            <div className="form-group">
                <label for="email-input">Sähköposti</label>
                <input type="email" className="form-control" id="email-input" placeholder="name@example.com" />
                <small id="emailHelp" className="form-text text-muted">Kirjoita Sähköposti</small>
            </div>
            <div className="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
        </form>)
    }

    render() {

        return (
            <div className="form-container">
                {this.generateLocationForm()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tagList: state.filters
    }
}
export default connect(mapStateToProps, { removeFilter })(TagBar);

