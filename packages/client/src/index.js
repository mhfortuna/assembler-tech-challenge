import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReduxProvider from "./redux/provider";
import "bootstrap/dist/css/bootstrap.css";
import "./sass/main.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
