import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withTranslation } from "react-i18next"
import PrivateRoute from "./PrivateRoute"
const Main = React.lazy(() => import("../containers/Main"));
const Admin = React.lazy(() => import("../containers/Admin"));
const Login = React.lazy(() => import("../containers/Login"));
import Spinner from "../helpers/Spinner"
// import Main from "../containers/Main";
// import Admin from "../containers/Admin";
// import Login from "../containers/Login"


class Routes extends Component {
    render() {
        const { i18n, language, t } = this.props
        //console.log(t, "in routes")
        //console.log(this.props)
        //console.log(i18n)
        if (i18n.language != language) {
            i18n.changeLanguage(language);
        }
        return (
            <Switch>
                <Suspense fallback={<Spinner loading={true} />}>
                    <PrivateRoute exact path="/hallinta" t={t} component={Admin} />
                    {/* <Route exact path="/hallinta" render={(props) => (<Admin {...props} t={t} />)} /> */}
                    <Route exact path="/" render={(props) => (<Main {...props} t={t} />)} />
                    <Route exact path="/kirjaudu" render={(props) => (<Login {...props} t={t} />)} />
                </Suspense>
            </Switch>
        )
    }
}



const mapStateToProps = state => ({
    language: state.general.language
});

export default compose(withRouter, withTranslation('translations'), connect(mapStateToProps, {}))(Routes);

