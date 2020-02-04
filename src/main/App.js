import React from "react";
import Main from "../containers/Main"
import Routes from "./Routes"
import { BrowserRouter } from 'react-router-dom';
import i18n from "./i18n"
import { I18nextProvider } from "react-i18next"


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <Routes i18n={i18n} />
                </I18nextProvider>
            </BrowserRouter >

        )
    }
}

// const App = () => {
// 	return (
// 		<Provider store={store.store}>
// 			<PersistGate loading={null} persistor={store.persistor}>
// 				<Router>
// 					<I18nextProvider i18n={i18n} >
// 						<div className="app">
// 							<Routes i18n={i18n} />
// 							<Popup defaultOk="Palaa Takaisin" />
// 						</div>
// 					</I18nextProvider>
// 				</Router>
// 			</PersistGate>
// 		</Provider >
// 	);
// }


export default App;