import React from "react";
import "./admin.css"
import { connect } from "react-redux";
import InfoDialog from "./InfoDialog";
import InputContainer from "../inputform"
class LocationList extends React.Component {
    state = {
        currentSort: "id",
        // 1 asc, -1 desc
        sortType: 1,
        clickedObj: null,
        clickPos: null
    }
    getText = () => {
        return "<-";
    }
    handleRemove = () => {

    }
    handleEdit = () => {

    }

    handleObjectClick = (obj, e) => {
        //set clickedobject and move window down by 50px and right by 50px from clicked position
        this.setState({ clickedObj: obj, clickPos: { height: e.clientY + 50, width: e.clientX + 50 } });

    }
    handleClose = () => {
        this.setState({ clickedObj: null });
    }

    getRowData = (obj) => {
        return (
            <tr key={obj.id} onClick={(e) => this.handleObjectClick(obj, e)}>
                <th scope="row">{obj.id}</th>
                <td>{obj.name}</td>
                <td>{obj.text}</td>
                <td>{obj.propertyType}</td>
                <td>{obj.data.ownerName}</td>
            </tr>
        )

    }

    handleListClick = (e) => {
        const { currentSort, sortType } = this.state;
        let id = e.target.id;
        // get the id and compare it to current sort type
        // if same column is clicked, change sort type
        // if other column is clicked set it to current sort
        if (id) {
            if (id === currentSort) {
                this.setState({ sortType: sortType * -1 })
            } else {
                this.setState({ currentSort: id })
            }
        }

    }

    checkType = (type) => {
        return type === "locations"
    }
    handleSort = () => {
        const { results, notifications, type } = this.props;
        const { currentSort, sortType } = this.state;
        let newResults = this.checkType(type) ? [...results] : [...notifications];
        newResults = newResults.sort((a, b) => {
            switch (sortType) {
                case 1:
                    if (currentSort === "ownerName") {

                        return ('' + a.data.ownerName).localeCompare(b.data.ownerName)
                    } else {

                        return ('' + a[currentSort]).localeCompare(b[currentSort])

                    }
                case -1:
                    if (currentSort === "ownerName") {
                        return ('' + b.data.ownerName).localeCompare(a.data.ownerName)
                    } else {
                        return ('' + b[currentSort]).localeCompare(a[currentSort])
                    }
                default:
                    return a.id - b.id;
            }

        })
        return newResults;

    }
    generateListItems = () => {
        const { currentSort, sortType } = this.state;
        let results = this.handleSort();
        const values = results.map(location => {
            return this.getRowData(location)

        })
        //let sortedClassName = 
        let image = <img className={sortType === 1 ? "sort-icon" : "sort-icon inverse-icon"} alt="imgarrow" src="/icons/arrow.svg" />
        let head = (<thead>
            <tr onClick={this.handleListClick}>
                <th id="id" scope="col">#{currentSort === "id" && image}</th>
                <th id="name" scope="col">Nimi{currentSort === "name" && image}</th>
                <th id="text" scope="col">Sijainti{currentSort === "text" && image}</th>
                <th id="propertyType" scope="col">Tyyppi{currentSort === "propertyType" && image}</th>
                <th id="ownerName" scope="col">Omistaja{currentSort === "ownerName" && image}</th>
            </tr>
        </thead>)

        let body = (<tbody>
            {values}
        </tbody>)

        return (<table className="table table-hover">
            {head}
            {body}
        </table>)


    }


    render() {
        const { clickedObj, clickPos } = this.state;
        const { type } = this.props;
        // this same component is used in admin notification and admin location list page
        let isLocation = this.checkType(type);
        let title = isLocation ? "Nykyiset retkipaikat" : "Hyväksymättömät retkipaikat"
        const items = this.generateListItems();
        console.log(clickedObj, "in locationList clicked")
        return (
            <div className="admin-content-container">
                <h3>{title}</h3>
                {isLocation && <InputContainer adminPage={true} />}
                <div className="location-list-container">
                    {items}
                </div>

                {clickedObj !== null && <InfoDialog data={clickedObj} clickHeight={clickPos} handleClose={this.handleClose}></InfoDialog>}


            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        results: state.searchResults.filteredResults,
        notifications: state.searchResults.notificationResults

    }
}
export default connect(mapStateToProps)(LocationList);

