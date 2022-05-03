import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./Search";
import Ind from "./Ind";
import Practice from "./Practice";
import NewData from "./NewData";
import Meee from "./New";
import Imp from "./Imp";

import { Remember } from "./Remember";
import { From } from "./From";
import { Clear } from "./Clear";
import { Same } from "./Same";


ReactDOM.render(
  <React.StrictMode>
    {/* <Home /> */}
    {/* <Meee /> */}
    {/* <Ind /> */}
    {/* <Api /> */}
    {/* <Imp /> */}
    {/* <Remember  /> */}
    <Clear />
    {/* <Same /> */}
    {/* <From /> */}
    {/* <NewData /> */}
    {/* <Practice /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
