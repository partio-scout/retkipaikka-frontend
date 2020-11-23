import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'redux'
import { connect } from "react-redux";
import { withTranslation } from "react-i18next"
import PrivateRoute from "./PrivateRoute"
import { AdminContextProvider } from "../context/AdminContext"
import Header from "../components/header/Header"
import SingleLocation from "../components/admin/SingleLocation"
const Main = React.lazy(() => import("../containers/Main"));
const Admin = React.lazy(() => import("../containers/Admin"));
const Login = React.lazy(() => import("../containers/Login"));
const NotificationContainer = React.lazy(() => import("../containers/NotificationContainer"))
import Spinner from "../components/shared/Spinner"
// import Main from "../containers/Main";
// import Admin from "../containers/Admin";
// import Login from "../containers/Login"


class Routes extends Component {
    render() {
        const { i18n, language, t } = this.props
        if (i18n.language != language) {
            i18n.changeLanguage(language);
        }
        return (
            <Switch>
                <Suspense fallback={<Spinner loading={true} />}>
                    <AdminContextProvider>
                        <Header t={t} location={this.props.location} />
                        <PrivateRoute exact path="/hallinta" t={t} component={Admin} />
                        <PrivateRoute exact path="/retkipaikka/:id/" t={t} component={SingleLocation} />
                        <Route exact path="/kirjaudu" render={(props) => (<Login {...props} t={t} />)} />
                    </AdminContextProvider>
                    {/* <Route exact path="/hallinta" render={(props) => (<Admin {...props} t={t} />)} /> */}
                    <Route exact path="/" render={(props) => (<Main t={t} />)} />

                    <Route exact path="/ilmoitukset" render={(props) => (<NotificationContainer {...props} t={t} />)} />

                </Suspense>
            </Switch>
        )
    }
}



const mapStateToProps = state => ({
    language: state.general.language
});

export default compose(withRouter, withTranslation('translations'), connect(mapStateToProps, {}))(Routes);

