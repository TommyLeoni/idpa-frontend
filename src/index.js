import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Root";
import React from "react";

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
};

const AlertProviderRoot = () => (
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Root />
  </AlertProvider>
);

ReactDOM.render(<AlertProviderRoot />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
