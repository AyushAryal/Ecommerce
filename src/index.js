import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/Store";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { login } from "./redux/ActionCreators/AuthAction";

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);

if (localStorage.getItem("knit_user")) {
    const userState = JSON.parse(localStorage.getItem("knit_user"));
    if (userState.auth_token) {
        store.dispatch(login(userState));
    }
    console.log(localStorage.getItem("knit_user"));
}

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
