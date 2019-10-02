import React from "react";
import Main from "../containers/Main"
import Routes from "./Routes"
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>

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