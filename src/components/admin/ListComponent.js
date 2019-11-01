import React from "react";


const ListComponent = (props) => {

    // not in use at the moment
    return (
        <div className="location-list-item">
            <span className="list-item-text-container">
                <span><strong>Nimi:</strong>{props.data.name}</span>
                <span><strong>Sijainti:</strong> {props.data.text}</span>
                <span><strong>Tyyppi:</strong> {props.data.propertyType}</span>
            </span>
            <span className="list-item-button-container">
                <button className="btn btn-primary">Lisätietoa</button>
                <button className="btn btn-primary">Muokkaa</button>
                <button className="btn btn-primary">Poista</button>
            </span>

        </div>
    )

}


export default ListComponent;