import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'redux'
import { connect } from "react-redux";

import Main from "../containers/Main";
import Admin from "../containers/Admin";



class Routes extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <Switch>
                <Route exact path="/hallinta" render={(props) => (<Admin {...props} />)} />
                <Route exact path="/" render={(props) => (<Main {...props} />)} />
                <Route render={() => (<h1>Sivua ei löydy</h1>)} />
            </Switch>
        )
    }
}



const mapStateToProps = state => ({

});

export default compose(withRouter, connect(mapStateToProps, {}))(Routes);
