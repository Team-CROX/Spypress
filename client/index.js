import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import store from "./store.js";
// import persistor from "./store.js";
import configureStore from "./store.js";
const {persistor, store} = configureStore();
import App from "./App.jsx";
import './styles.scss'
import { PersistGate } from 'redux-persist/integration/react'
// import { strict } from "assert";

//Render for main App Component, that has store inside as an attibute inside it's Provider;
//Provides store to component;
ReactDOM.render(
  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
