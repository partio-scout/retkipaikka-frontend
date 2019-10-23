import React from "react";


const ListComponent = (props) => {

    //{ type: "city", name: "Testilaavu", text: "Tampere", geo: { lat: 61.29, lng: 23.45 }, description: "laavu jossain", propertyType: "Laavu", has: ["Järvi lähellä"], data: { ownerName: "hehu", website: "www.hehu.fi", phone: "123034234", mail: "oy@partio.com" } },
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