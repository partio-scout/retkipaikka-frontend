import React from "react";
import "./admin.css"
class AdminPanel extends React.Component {



    render() {
        const { handleClick } = this.props;
        return (
            <div className="admin-panel">
                <div className="list-group admin-list" >
                    <span onClick={handleClick} id="notifications" className="list-group-item list-group-item-action" >
                        Katso ilmoituksia
                    </span>
                    <span onClick={handleClick} id="locations" className="list-group-item list-group-item-action" >Selaa retkipaikkoja</span>
                    <span onClick={handleClick} id="settings" className="list-group-item list-group-item-action" >Asetukset</span>
                </div>

            </div>


        )
    }
}

export default AdminPanel;