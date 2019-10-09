import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <div className="header-container">
                <h4 className="header-container-text">Partion retkipaikat</h4>
                {location.pathname !== "/hallinta" && <span className="header-login-button">
                    <Link to="/hallinta" >
                        <button className="btn btn-primary" >Kirjaudu</button>
                    </Link>
                </span>}
            </div>
        )
    }
}

export default Header;